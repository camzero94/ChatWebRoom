package ws

type Room struct {
	ID      string             `json:"id"`
	Name    string             `json:"name"`
	Clients map[string]*Client `json:"clients"`
}

type Hub struct {
	Rooms      map[string]*Room
	Register   chan *Client
	Unregister chan *Client
	Broadcast  chan *Message
}

func NewHub() *Hub {
	return &Hub{
		Rooms: make(map[string]*Room),
    Register: make(chan *Client),
    Unregister: make(chan *Client),
    Broadcast: make(chan *Message),
	}
}

func (h *Hub) Run() {
  for{
    select {
      case cl := <- h.Register:
        //If room exists
        if _,ok := h.Rooms[cl.RoomID]; ok{
          r := h.Rooms[cl.RoomID]
          //Add client to room , first check if client exists
          if _,ok := r.Clients[cl.ID]; !ok{
            r.Clients[cl.ID] = cl
          }
        }
      case cl := <- h.Unregister:
        //If room exists
        if _,ok := h.Rooms[cl.RoomID]; ok{
          if _,ok := h.Rooms[cl.RoomID].Clients[cl.ID]; ok{
            // broadcast if user has left the room
            if len(h.Rooms[cl.RoomID].Clients) > 0 {
              m := &Message{
                Content: cl.Username + " has left the room",
                RoomID: cl.RoomID,
                Username: cl.Username,
              }
              h.Broadcast <- m

            }
            delete(h.Rooms[cl.RoomID].Clients,cl.ID)
            close(cl.Message)
          }
        }
      case m := <- h.Broadcast:
        //If room exists
        if _,ok := h.Rooms[m.RoomID]; ok{
          //Send message to all Clients in room
          for _,cl := range h.Rooms[m.RoomID].Clients{
            cl.Message <- m
          }
        }


    }
  }
}
