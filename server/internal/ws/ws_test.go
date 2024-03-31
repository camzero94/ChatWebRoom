
package ws

import (
  "testing"
	"github.com/gorilla/websocket"
  "net/http"
  "github.com/stretchr/testify/assert"
)


func TestNewHub(t *testing.T) {

  hub := NewHub()
  if hub == nil {
    t.Error("Expected hub to be created")
  }  
}

func TestNewHandler(t *testing.T) {

  hub := NewHub()
  h := NewHandler(hub)
  if h == nil {
    t.Error("Expected hub Handler to be created")
  }  
}

func TestHubRun(t *testing.T) {

  hub := NewHub()
  go hub.Run()
  if hub == nil {
    t.Error("Expected hub to be created")
  }  
}

func TestWebscoket(t *testing.T) {

  var upgrader = websocket.Upgrader{
      ReadBufferSize:  1024,
      WriteBufferSize: 1024,
      CheckOrigin: func(r *http.Request) bool {
        return true
      },
    }
  assert := assert.New(t)
  assert.Equal(upgrader.ReadBufferSize,Upgrader.ReadBufferSize,"The two Read Buffer Size sould be 1024")
  assert.Equal( upgrader.WriteBufferSize,Upgrader.WriteBufferSize,"The two Write Buffer Size sould be 1024")
}
