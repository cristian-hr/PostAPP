package main

import (
	"log"
	"os"

	"post-app-api/config"
	"post-app-api/handlers"
	"post-app-api/middleware"
	"post-app-api/pkg/logger"
	"post-app-api/repository"
	"post-app-api/service"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	if err := godotenv.Load(); err != nil {
		log.Println("No se encontró archivo .env (usando variables de entorno del sistema)")
	}

	logger.Init()
	config.ConnectDB()

	postRepo := repository.NewPostRepository(config.DB)
	postService := service.NewPostService(postRepo)
	postHandler := handlers.NewPostHandler(postService)

	r := gin.New()

	r.Use(gin.Logger())
	r.Use(gin.Recovery())
	r.Use(middleware.ErrorHandler())

	r.GET("/posts", postHandler.GetPosts)
	r.GET("/posts/:name", postHandler.GetPostsByName)
	r.POST("/posts", postHandler.CreatePost)
	r.DELETE("/posts/:id", postHandler.DeletePost)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	r.Run(":" + port)
}
