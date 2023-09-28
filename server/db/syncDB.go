package db

import "github.com/camzero94/server/models"


func SyncDB() {
  DB.AutoMigrate(&models.User{})
  // DB.Migrator().DropColumn(&models.User{}, "secret")
}

