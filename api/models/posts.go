package models

import "time"

type Post struct {
	ID          uint      `gorm:"primaryKey;column:id" json:"id"`
	Name        string    `gorm:"column:name" json:"name" binding:"required"`
	Description string    `gorm:"column:description" json:"description" binding:"required"`
	CreatedAt   time.Time `gorm:"column:createdAt" json:"createdAt"`
	UpdatedAt   time.Time `gorm:"column:updatedAt" json:"updatedAt"`
}

func (Post) TableName() string {
	return "posts"
}
