package controllers

import (
	"net/http"
	"github.com/gin-gonic/gin"
  "github.com/camzero94/server/models"
  "golang.org/x/crypto/bcrypt"
  "github.com/camzero94/server/db"
  "github.com/golang-jwt/jwt/v4"
  "time"
  "os"
  "fmt"
)

func Login(c *gin.Context){
  


  //Get the body request
  var body struct {
    Email    string `json:"email"`
    Password string `json:"password"`
  }
  //Validate the body request
  if c.Bind(&body) != nil {
    c.JSON(http.StatusBadRequest, gin.H{"error": "Fields are empty or not valid."})
    return
  }

  fmt.Println("Body:", body)
  //Look for the user in the database
  var user models.User
   db.DB.First(&user,"email = ?",body.Email)

   if user.ID == 0 {
      c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid Email or Password."})
      return
   }

  //Compare the password with the hash

  err := bcrypt.CompareHashAndPassword([]byte(user.PasswordHash), []byte(body.Password))

  if err != nil {
    c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid Email or Password."})
    return
  }
  //Generate JWT token

  var UserToken struct{
    UserId string 
    Username string 
  }
  userTk := &UserToken{UserId: string(user.ID),Username: user.Email,}
  token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
    "sub": userTk, 
    "exp": time.Now().Add(time.Hour * 24 * 30).Unix(),
  })

  //Sign the token and get the complete Token
  tokenString, err := token.SignedString([]byte(os.Getenv("SECRET")))

  if err != nil {
    c.JSON(http.StatusBadRequest, gin.H{"error": "Error signing the token."})
    return
  }

  //Send cookie with the token
  c.SetSameSite(http.SameSiteLaxMode)
  c.SetCookie("Authorization",tokenString, 3600 * 24  ,"","",true,false)
  c.JSON(http.StatusOK, gin.H{"message": "User logged in successfully."})

}


func SignUp(c *gin.Context) {
	//Get the body request
	var body struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}
	//Validate the body request
	if c.Bind(&body) != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Fields are empty or not valid."})
		return
	}
	//Hash the password
  hash,err := bcrypt.GenerateFromPassword([]byte(body.Password), bcrypt.DefaultCost)
  if err != nil {
    c.JSON(http.StatusBadRequest, gin.H{"error": "Error hashing the password."})
    return 
  }

	//Create the user
  user := models.User{Email: body.Email,PasswordHash: string(hash)}
  result := db.DB.Create(&user)

  if result.Error != nil {
    c.JSON(http.StatusBadRequest, gin.H{"error": "Error creating the user."})
  } else {
    c.JSON(http.StatusOK, gin.H{"message": "User created successfully."})
  }
	//Return the user
}


func Validate(c *gin.Context) {

  //Validate User 
  user,_ := c.Get("user")

  fmt.Println("User Id",user.(models.User).ID)

  c.JSON(http.StatusOK, gin.H{"message": user})

}

func LogOut (c *gin.Context){
  c.SetCookie("Authorization","", -1,"","",false,true)
  c.JSON(http.StatusOK, gin.H{"message": "User logged out successfully."})
}





// func Index(c *gin.Context) {
//   c.HTML(http.StatusOK, "index.html", gin.H{
//   })
// }
//
// func LoginHtmx(c *gin.Context){
//   log.Println("HEREEEEEE")
//   // email:= c.Query("email")
//   // password := c.Query("password")
//   // //Validate the Form Request
//   // if email == "" || password == "" {
//   //   log.Println("Username or password empty")
//   //   return 
//   // }
//   // fmt.Println(email,password)
//   // 
//   // //Get the body request
//   // var body struct {
//   //   Email    string `json:"email"`
//   //   Password string `json:"password"`
//   // }
//   // body.Email = email 
//   // body.Password = password
//   //
//   //
//   // //Look for the user in the database
//   // var user models.User
//   //  db.DB.First(&user,"email = ?",body.Email)
//   //
//   //  if user.ID == 0 {
//   //   log.Println("Invalid Email or Password.")
//   //     // c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid Email or Password."})
//   //     return
//   //  }
//   //
//   // //Compare the password with the hash
//   // err := bcrypt.CompareHashAndPassword([]byte(user.PasswordHash), []byte(body.Password))
//   //
//   // if err != nil {
//   //   log.Println("Invalid Email or Password.")
//   //   // c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid Email or Password."})
//   //   return
//   // }
//   // //Generate JWT token
//   // token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
//   //   "sub": user.ID,
//   //   "exp": time.Now().Add(time.Hour * 24 * 30).Unix(),
//   // })
//   //
//   // //Sign the token and get the complete Token
//   // tokenString, err := token.SignedString([]byte(os.Getenv("SECRET")))
//   //
//   // if err != nil {
//   //   c.JSON(http.StatusBadRequest, gin.H{"error": "Error signing the token."})
//   //   return
//   // }
//   //
//   // //Send cookie with the token
//   //
//   // c.SetSameSite(http.SameSiteLaxMode)
//   // c.SetCookie("Authorization",tokenString, 3600 * 24 * 30 ,"","",false,true)
//   //
//   // c.JSON(http.StatusOK, gin.H{"message": "User logged in successfully."})
//
// }
//
