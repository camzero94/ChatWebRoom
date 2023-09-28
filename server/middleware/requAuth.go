package middleware

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v4"
	"net/http"
	"os"
  "time"
  "github.com/camzero94/server/db"
  "github.com/camzero94/server/models"

)

func ReuireAuth(c *gin.Context) {

	//Get the cookie from Request
	tokenString, err := c.Cookie("Authorization")

	if err != nil {
		c.AbortWithStatus(http.StatusUnauthorized)
	}
	//Decode/Validate cookie
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		// Don't forget to validate the alg is what you expect:
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("Unexpected signing method: %v", token.Header["alg"])
		}
		return []byte(os.Getenv("SECRET")), nil
	})

	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {

    //Check if the cookie is valid exp
    if float64(time.Now().Unix()) > claims["exp"].(float64){
      c.AbortWithStatus(http.StatusUnauthorized)
    }

    //Find the user with token sub
    var user models.User
    db.DB.First(&user,claims["sub"])  
    if user.ID == 0{
      c.AbortWithStatus(http.StatusUnauthorized)
    }

    //Attach to Request
    c.Set("user",user)
    fmt.Println(user)
    c.Next()

	} else {
    c.AbortWithStatus(http.StatusUnauthorized)
	}

	//Continue
	c.Next()

}
