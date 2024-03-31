package config

import (
 	"github.com/gin-contrib/cors"
)

var Config cors.Config  

//Allow CORS
func InitConfig(){
  Config = cors.DefaultConfig();
  Config = cors.Config{
    AllowOrigins : []string{"http://localhost:3000", "http://localhost:8080", "http://localhost:3001","http://room.camzerocol.com","https://room.camzerocol.com"},
    AllowCredentials : true,
  }
}


