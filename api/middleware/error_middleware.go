package middleware

import (
	"net/http"

	"post-app-api/pkg/apperrors"
	"post-app-api/pkg/logger"

	"github.com/gin-gonic/gin"
)

func ErrorHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Next()

		if len(c.Errors) == 0 {
			return
		}

		err := c.Errors.Last().Err

		// Si es AppError
		if appErr, ok := err.(*apperrors.AppError); ok {

			// Log estructurado
			logger.Log.Error(
				"application error",
				"code", appErr.Code,
				"message", appErr.Message,
				"internal_error", appErr.Err,
				"path", c.Request.URL.Path,
				"method", c.Request.Method,
			)

			c.JSON(appErr.HTTPStatus, gin.H{
				"code":    appErr.Code,
				"message": appErr.Message,
			})
			return
		}

		// Error inesperado
		logger.Log.Error(
			"unexpected error",
			"error", err,
			"path", c.Request.URL.Path,
			"method", c.Request.Method,
		)

		c.JSON(http.StatusInternalServerError, gin.H{
			"code":    "INTERNAL_ERROR",
			"message": "internal server error",
		})
	}
}
