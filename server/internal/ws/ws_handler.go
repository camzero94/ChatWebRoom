package ws

import (
	"net/http"
  "fmt"
	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
)

type Handler struct {
	hub *Hub
}

type CreateRoomReq struct {
	ID   string `json:"id"`
	Name string `json:"name"`
}

func NewHandler(h *Hub) *Handler {
	return &Handler{
		hub: h,
	}
}

func (h *Handler) CreateRoom(c *gin.Context) {

	var req CreateRoomReq
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	h.hub.Rooms[req.ID] = &Room{
		ID:      req.ID,
		Name:    req.Name,
		Clients: make(map[string]*Client),
	}

	c.JSON(http.StatusOK, req)

}

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

func (h *Handler) JoinRoom(c *gin.Context) {

  fmt.Println("JoinRoom")
	conn, err := upgrader.Upgrade(c.Writer, c.Request, nil)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	//ws/joinRoom/:roomID?username=1&userID=1234
	//Params
	roomID := c.Param("roomID")
	//Queries
	username := c.Query("username")
	clientID := c.Query("userID")

	cl := &Client{
		Conn:     conn,
		Message:  make(chan *Message, 10),
		ID:       clientID,
		RoomID:   roomID,
		Username: username,
	}
	m := &Message{
		Content:  username + " joined room",
		RoomID:   roomID,
		Username: username,
	}

	//Register a new client through the register chanel
	h.hub.Register <- cl
	//Broadcast that message
	h.hub.Broadcast <- m
	//WritteMessage()
	go cl.WriteMessage()
	//ReadMessage()
	cl.ReadMessage(h.hub)

}

type RoomRes struct {
	ID   string `json:"id"`
	Name string `json:"name"`
}

func (h *Handler) GetRooms(c *gin.Context) {

	rooms := make([]RoomRes, 0)

	for _, r := range h.hub.Rooms {
		rooms = append(rooms, RoomRes{
			ID:   r.ID,
			Name: r.Name,
		})
	}
  c.JSON(http.StatusOK, rooms)
}

type ClientRes struct {
	ID   string `json:"id"`
	Username string `json:"username"`
}
func (h *Handler) GetClientsInRoom(c *gin.Context) {

  var clients []ClientRes
  roomID := c.Param("roomID")

  if _,ok := h.hub.Rooms[roomID]; !ok{
    clients = make([]ClientRes, 0)
    c.JSON(http.StatusOK, clients)
  }
  for _,c := range h.hub.Rooms[roomID].Clients{
    clients = append(clients, ClientRes{
      ID: c.ID,
      Username: c.Username,
    })
  }

  c.JSON(http.StatusOK, clients)


}








