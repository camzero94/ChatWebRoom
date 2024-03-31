package main

import (
    "io"
    "os"
    "fmt"
    "ariga.io/atlas-provider-gorm/gormschema"
    "github.com/camzero94/server/models"
)

func main() {
    stmts, err := gormschema.New("postgres").Load(&models.User{})
    if err != nil {
        fmt.Fprintf(os.Stderr, "failed to load gorm schema: %v\n", err)
        os.Exit(1)
    }
    io.WriteString(os.Stdout, stmts)
}
