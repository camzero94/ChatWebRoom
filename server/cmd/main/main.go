package main

import (
	"github.com/camzero94/server/controllers"
	"github.com/camzero94/server/db"
	"github.com/camzero94/server/internal/ws"
	"github.com/camzero94/server/middleware"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func init() {
	// db.LoadEnvVariables()
	db.ConnectToDB()
}

var r *gin.Engine


func main() {
  // db:= os.Getenv("HOST_BACKEND")
  // fmt.Println("DB: ",db)


	r = gin.Default()
	config := cors.DefaultConfig()
  	config.AllowOrigins = []string{"http://localhost:3000", "http://localhost:8080", "http://localhost:3001","http://room.camzerocol.com","https://room.camzerocol.com"}
	config.AllowCredentials = true
	r.Use(cors.New(config))

	hub := ws.NewHub()
	wsHandler := ws.NewHandler(hub)
	go hub.Run()

	r.POST("/signUp", controllers.SignUp)
	r.POST("/login", controllers.Login)
	r.GET("/validate", middleware.ReuireAuth, controllers.Validate)
	r.GET("/logout", controllers.LogOut)

	r.POST("/ws/createRoom", wsHandler.CreateRoom)
	r.DELETE("/ws/deleteRoom", wsHandler.DeleteRoom)

	r.GET("/ws/joinRoom/:roomID", wsHandler.JoinRoom)
	r.GET("/ws/getRooms", wsHandler.GetRooms)
	r.GET("/ws/getClients/:roomID", wsHandler.GetClientsInRoom)

	Start("0.0.0.0:8080") // listen and serve on 0.0.0.0:8080

}

func Start(addr string) error {
	return r.Run(addr)
}
