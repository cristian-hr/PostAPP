package apperrors

import "net/http"

type AppError struct {
	Code       string
	Message    string
	HTTPStatus int
	Err        error // error interno (opcional)
}

func (e *AppError) Error() string {
	return e.Message
}

func New(code string, message string, status int) *AppError {
	return &AppError{
		Code:       code,
		Message:    message,
		HTTPStatus: status,
	}
}

func Wrap(code string, message string, status int, err error) *AppError {
	return &AppError{
		Code:       code,
		Message:    message,
		HTTPStatus: status,
		Err:        err,
	}
}

var (
	ErrInvalidInput = New("INVALID_INPUT", "invalid input", http.StatusBadRequest)
	ErrNotFound     = New("NOT_FOUND", "resource not found", http.StatusNotFound)
	ErrConflict     = New("CONFLICT", "resource conflict", http.StatusConflict)
	ErrInternal     = New("INTERNAL_ERROR", "internal server error", http.StatusInternalServerError)
)
