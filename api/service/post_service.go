package service

import (
	"errors"
	"strings"

	"post-app-api/models"
	"post-app-api/pkg/apperrors"
	"post-app-api/repository"

	"net/http"
)

type PostService interface {
	GetAll() ([]models.Post, error)
	GetByName(name string) ([]models.Post, error)
	Create(post *models.Post) error
	Delete(id uint) (*models.Post, error)
}

type postService struct {
	repo repository.PostRepository
}

func NewPostService(repo repository.PostRepository) PostService {
	return &postService{repo: repo}
}

func (s *postService) GetAll() ([]models.Post, error) {
	return s.repo.FindAll()
}

func (s *postService) GetByName(name string) ([]models.Post, error) {
	name = strings.TrimSpace(name)

	if name == "" {
		return nil, errors.New("name no puede estar vacío")
	}

	return s.repo.FindByName(name)
}

func (s *postService) Create(post *models.Post) error {
	post.Name = strings.TrimSpace(post.Name)
	post.Description = strings.TrimSpace(post.Description)

	if post.Name == "" {
		return apperrors.New(
			"INVALID_INPUT",
			"name es obligatorio",
			http.StatusBadRequest,
		)
	}

	existing, err := s.repo.FindByName(post.Name)
	if err != nil {
		return apperrors.Wrap(
			"DB_ERROR",
			"error verificando duplicados",
			http.StatusInternalServerError,
			err,
		)
	}

	if len(existing) > 0 {
		return apperrors.New(
			"CONFLICT",
			"ya existe un post con ese name",
			http.StatusConflict,
		)
	}

	if err := s.repo.Create(post); err != nil {
		return apperrors.Wrap(
			"DB_ERROR",
			"error creando post",
			http.StatusInternalServerError,
			err,
		)
	}

	return nil
}

func (s *postService) Delete(id uint) (*models.Post, error) {
	if id == 0 {
		return nil, apperrors.ErrInvalidInput
	}

	deleted, err := s.repo.Delete(id)
	if err != nil {
		if errors.Is(err, repository.ErrPostNotFound) {
			return nil, apperrors.ErrNotFound
		}
		return nil, apperrors.ErrInternal
	}

	return deleted, nil
}
