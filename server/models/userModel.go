package models

import (
  "gorm.io/gorm"
)

type User struct {
  gorm.Model
  Email string `gorm:"unique;not null"`
  PasswordHash string
  FirstName string
}

func (u User) TableName() string {
  return "UserDB"
}

