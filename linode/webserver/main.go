package main

import (
	"database/sql"
	"fmt"
	"github.com/gin-gonic/gin"
	"log"
	"net/http"

	_ "github.com/lib/pq"
)

const (
	DbHost     = "db"
	DbUser     = "postgres-dev"
	DbPassword = "mysecretpassword"
	DbName     = "dev"
	Migration  = `CREATE TABLE IF NOT EXISTS etsyshops (
		name text PRIMARY KEY,
		url text NOT NULL,
		site text NOT NULL)`
)

type EtsyShop struct {
	Name string `json:"name" binding:"required`
	Url  string `json:"url" binding:"required`
	Site string `json:"site" binding:"required`
}

func getShops() ([]EtsyShop, error) {

	const q = `SELECT author, content, created_at FROM etsyshops ORDER BY created_at DESC LIMIT 100`
	rows, err := db.Query(q)
	if err != nil {
		return nil, err
	}
	results := make([]EtsyShop, 0)
	for rows.Next() {
		var name string
		var url string
		var site string
		err = rows.Scan(&name, &url, &site)
		results = append(results, EtsyShop{name, url, site})
	}
	return nil, nil
}

func addShop(shop EtsyShop) error {
	const g = `INSERT INTO etsyshops(name, url, site) VALUES ($1, $2, $3)`
	_, err := db.Exec(g, shop.Name, shop.Url, shop.Site)

	return err
}

var db *sql.DB

func main() {
	gin.SetMode(gin.ReleaseMode)
	var err error

	r := gin.Default()
	r.GET("/all", func(context *gin.Context) {
		results, err := getShops()
		if err != nil {
			context.JSON(http.StatusInternalServerError, gin.H{"status": "we done messed up: " + err.Error()})
		}
		context.JSON(http.StatusOK, results)
	})
	r.POST("/add", func(context *gin.Context) {
		var b EtsyShop
		if context.Bind(&b) == nil {
			if err := addShop(b); err != nil {
				context.JSON(http.StatusInternalServerError, gin.H{"status": "its not good in here: " + err.Error()})
			}
			context.JSON(http.StatusOK, gin.H{"status": "we gucci"})
		}
	})
	dbInfo := fmt.Sprintf("host=%s user=%s password=%s dbname=%s sslmode=disable", DbHost, DbUser, DbPassword, DbName)
	db, err = sql.Open("postgres", dbInfo)
	if err != nil {
		panic(err)
	}
	// do not forget to close the connection
	defer db.Close()
	// ensuring the table is created
	_, err = db.Query(Migration)
	if err != nil {
		log.Println("AFSAFSDGSDGas BITCH..")

		log.Println("failed to run migrations", err.Error())
		return
	}
	log.Println("running..")
	if err := r.Run(":8080"); err != nil {
		log.Println("THISSS BITCH..")

		panic(err)
	}
}

/*

[[constraint]]
  name = "github.com/gin-gonic/gin"
  version = "1.3.0"

[[constraint]]
  name = "github.com/lib/pq"
  version = "1.0.0"

[prune]
  go-tests = true
  unused-packages = true
*/
