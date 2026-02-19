package middleware

import (
	"os"
	"strings"

	"github.com/gin-gonic/gin"
)

func CORS() gin.HandlerFunc {
	return func(c *gin.Context) {
		origins := os.Getenv("CORS_ORIGIN")
		if origins == "" {
			origins = "*"
		}
		allowed := strings.Split(origins, ",")
		for i := range allowed {
			allowed[i] = strings.TrimSpace(allowed[i])
		}

		origin := c.Request.Header.Get("Origin")
		allow := ""
		if origin == "" || origins == "*" {
			allow = "*"
		} else {
			for _, o := range allowed {
				if o == origin {
					allow = origin
					break
				}
			}
		}
		if allow == "" {
			allow = allowed[0]
		}

		c.Header("Access-Control-Allow-Origin", allow)
		c.Header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS")
		c.Header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept, Authorization")
		c.Header("Access-Control-Allow-Credentials", "true")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}
