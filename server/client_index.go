package server

import (
	"encoding/json"
	"html/template"
	"io"
	"io/fs"
	"net/http"
	"path"
	"strings"

	"github.com/navidrome/navidrome/conf"
	"github.com/navidrome/navidrome/consts"
	"github.com/navidrome/navidrome/log"
)

func ClientIndex(fs fs.FS) http.HandlerFunc {
	return serveClientIndex(fs)
}

func serveClientIndex(clientFS fs.FS) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		t, err := getClientIndexTemplate(r, clientFS)
		if err != nil {
			http.NotFound(w, r)
			return
		}

		clientConfig := map[string]any{
			"serverUrl":  strings.TrimSuffix(conf.Server.BasePath, "/"),
			"appVersion": consts.Version,
			"baseUrl":    path.Join(conf.Server.BasePath, consts.URLPathClientUI),
		}

		configJson, err := json.Marshal(clientConfig)
		if err != nil {
			log.Error(r, "Error converting client config to JSON", "config", clientConfig, err)
		}

		data := map[string]any{
			"ClientConfig": string(configJson),
		}

		w.Header().Set("Content-Type", "text/html")
		err = t.Execute(w, data)
		if err != nil {
			log.Error(r, "Could not execute client `index.html` template", err)
		}
	}
}

func getClientIndexTemplate(r *http.Request, clientFS fs.FS) (*template.Template, error) {
	t := template.New("client")
	indexHtml, err := clientFS.Open("index.html")
	if err != nil {
		log.Error(r, "Could not find client `index.html` template", err)
		return nil, err
	}
	indexStr, err := io.ReadAll(indexHtml)
	if err != nil {
		log.Error(r, "Could not read from client `index.html`", err)
		return nil, err
	}
	t, err = t.Parse(string(indexStr))
	if err != nil {
		log.Error(r, "Error parsing client `index.html`", err)
		return nil, err
	}
	return t, nil
}
