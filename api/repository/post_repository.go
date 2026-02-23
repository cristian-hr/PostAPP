package repository

import (
	"errors"

	"post-app-api/models"

	"gorm.io/gorm"
)

var ErrPostNotFound = errors.New("post not found")

type PostRepository interface {
	FindAll() ([]models.Post, error)
	FindByName(name string) ([]models.Post, error)
	Create(post *models.Post) error
	Delete(id uint) (*models.Post, error)
}

type postRepository struct {
	db *gorm.DB
}

func NewPostRepository(db *gorm.DB) PostRepository {
	return &postRepository{db: db}
}

func (r *postRepository) FindAll() ([]models.Post, error) {
	var posts []models.Post
	result := r.db.Find(&posts)
	return posts, result.Error
}

func (r *postRepository) FindByName(name string) ([]models.Post, error) {
	var posts []models.Post
	result := r.db.Where("name = ?", name).Find(&posts)
	return posts, result.Error
}

func (r *postRepository) Create(post *models.Post) error {
	result := r.db.Create(post)
	return result.Error
}

func (r *postRepository) Delete(id uint) (*models.Post, error) {
	var post models.Post
	result := r.db.First(&post, id)
	if result.Error != nil {
		if errors.Is(result.Error, gorm.ErrRecordNotFound) {
			return nil, ErrPostNotFound
		}
		return nil, result.Error
	}
	result = r.db.Delete(&post)
	if result.Error != nil {
		return nil, result.Error
	}
	return &post, nil
}
