package functional_tests
import (
  "testing"
	"github.com/camzero94/server/config"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/camzero94/server/internal/ws"
	// "github.com/gorilla/websocket"
)


func TestCreateRoom(t *testing.T) {
  //Initialize router Gin
  r := gin.Default()
	r.Use(cors.New(config.Config))

//Unit Tests
	hub := ws.NewHub()
	// wsHandler := ws.NewHandler(hub)
	go hub.Run()

//Create Mock Room 
// var createRoomMock = ws.CreateRoomReq{
//     ID: "123",
//     Name: "testRoom",
//   }

// //Create Mock Client 
// var createClientMock = ws.Client{
//   ID: "123",
//   Conn: make(chan *websocket.Conn),
//   Message: make(chan *ws.Message),
//   Username: "testUser",
//   RoomID: "123",
//
//
//   
//
// }
//   hub.Rooms[createRoomMock.ID] = &ws.Room{
//     ID: createRoomMock.ID,
//     Name: createRoomMock.Name,
//     Clients: make(map[string]*ws.Client),
//   }
//

}

// type Client struct {
// 	ID       string `json:"id"`
// 	Conn     *websocket.Conn
// 	Message  chan *Message
// 	RoomID   string `json:"roomId"`
// 	Username string `json:"username"`
// }
	// if err := c.ShouldBindJSON(&req); err != nil {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	// 	return
	// }
	//
	// h.hub.Rooms[req.ID] = &Room{
	// 	ID:      req.ID,
	// 	Name:    req.Name,
	// 	Clients: make(map[string]*Client),
	// }
	//
	// c.JSON(http.StatusOK, req)



  // c := NewClient("ws://localhost:8080/ws")
  // c.On("open", func() {
  //   fmt.Println("open")
  // })
  // c.On("close", func() {
  //   fmt.Println("close")
  // })
  // c.On("message", func(msg string) {
  //   fmt.Println(msg)
  // })
  // c.Connect()
  // c.Send("hello")
  // c.Close()
// }
