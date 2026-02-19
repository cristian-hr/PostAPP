package repository

import (
	"post-app-api/models"

	"gorm.io/gorm"
)

type PostRepository interface {
	FindAll() ([]models.Post, error)
	FindByName(name string) ([]models.Post, error)
	Create(post *models.Post) error
	Delete(id uint) error
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

func (r *postRepository) Delete(id uint) error {
	result := r.db.Delete(&models.Post{}, id)
	return result.Error
}
