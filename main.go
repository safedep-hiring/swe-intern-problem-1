package main

import (
	"context"
	"fmt"
	"log"
	"os"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/jackc/pgx/v5/pgxpool"
)

type Command struct {
	CmdID     int
	CmdName   string
	Timestamp time.Time
}

func main() {
	app := fiber.New()

	// Database connection
	dbURL := os.Getenv("DATABASE_URL")
	// if dbURL == "" {
	// 	dbURL = "postgres://postgres:admin@localhost:5432/postgres"
	// }

	dbConfig, err := pgxpool.ParseConfig(dbURL)
	if err != nil {
		log.Fatalf("Unable to parse database config: %v", err)
	}

	// Set connection pool parameters
	dbConfig.MaxConns = 50
	dbConfig.MinConns = 10
	dbConfig.MaxConnLifetime = time.Hour

	pool, err := pgxpool.NewWithConfig(context.Background(), dbConfig)
	if err != nil {
		log.Fatalf("Unable to create connection pool: %v", err)
	}
	defer pool.Close()

	conn, err := pool.Acquire(context.Background())
	if err != nil {
		log.Fatalf("Failed to acquire connection: %v", err)
	}
	defer conn.Release()

	err = conn.Conn().Ping(context.Background())
	if err != nil {
		log.Fatalf("Failed to ping database: %v", err)
	} else {
		log.Println("Database connection successfully established")
	}

	//Routes
	app.Get("/status", func(c *fiber.Ctx) error {
		c.Status(fiber.StatusOK)
		return c.SendString("server status : good")
	})
	app.Get("/", func(c *fiber.Ctx) error {
		rows, err := conn.Query(context.Background(), "SELECT * FROM commands")
		if err != nil {
			return err
		}
		defer rows.Close()

		var cmds []Command
		for rows.Next() {
			var cmd Command
			err = rows.Scan(&cmd.CmdID, &cmd.CmdName, &cmd.Timestamp)
			if err != nil {
				return err
			}
			cmds = append(cmds, cmd)
		}
		return c.JSON(cmds)
	})

	app.Get("/api/v1/commands", func(c *fiber.Ctx) error {
		// c.Status(fiber.StatusOK)
		keyword := c.Query("keyword")
		if keyword == "" {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"error": "Keyword is required for search",
			})
		}
		rows, err := conn.Query(context.Background(), "SELECT cmdName, COUNT(*) as count FROM commands WHERE cmdName LIKE $1 GROUP BY cmdName", keyword+"%")
		if err != nil {
			return err
		}
		defer rows.Close()

		var cmds []struct {
			CmdName string
			Count   int
		}
		for rows.Next() {
			var cmd struct {
				CmdName string
				Count   int
			}
			err = rows.Scan(&cmd.CmdName, &cmd.Count)
			if err != nil {
				return err
			}
			cmds = append(cmds, cmd)
		}
		return c.JSON(cmds)
	})

	app.Post("/api/v1/commands", func(c *fiber.Ctx) error {

		cmd := c.FormValue("command")
		if cmd == "" {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"error": "Command is required",
			})
		}

		rows, err := conn.Query(context.Background(), "INSERT INTO commands (cmdName) VALUES ($1)", cmd)
		if err != nil {
			return err
		}
		defer rows.Close()

		return c.SendString("success!!")
	})

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	// Start server
	log.Printf("Server starting on port %s", port)
	log.Fatal(app.Listen(fmt.Sprintf(":%s", port)))
}
