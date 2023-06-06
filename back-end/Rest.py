from Wrapper import Wrapper
import cherrypy

@cherrypy.expose
class Rest:

    def __init__(self) -> None:
        print("ciao Chen")
        pass
        
    @cherrypy.tools.json_out()
    def GET(self, key = -1, tabella = "V_Acquario"):
        w = Wrapper()
        x = 0
        if str(key) == "-1":
            x = w.fetch_all(tabella, True)
            cherrypy.response.status = 200
        else:
            x = w.fetch(tabella, True, key)
            print(type(x))
            if x != None:
                cherrypy.response.status = 200
            else:
                x = {}
                cherrypy.response.status = 404
        return x
    
    @cherrypy.tools.json_in()
    @cherrypy.tools.json_out()
    def POST(self, tabella = "V_Acquario"):
        data = cherrypy.request.json
        w = Wrapper
        print(data)
        x = w.insert(tabella = tabella, data = data)
        if x["Esito"] == "Positivo":
            cherrypy.request.status = 200
        else:
            cherrypy.request.status = 404
        return x
    
    @cherrypy.tools.json_in()
    @cherrypy.tools.json_out()
    def PUT(self, key = -1, tabella = "V_Acquario"):
        data = cherrypy.request.json
        w = Wrapper
        print(data)
        x = w.update(tabella = tabella, data = data, value = key)
        if x["Esito"] == "Positivo":
            cherrypy.request.status = 200
        else:
            cherrypy.request.status = 404
        return x
    
    @cherrypy.tools.json_out()
    def DELETE(self, key = -1, tabella = "V_Acquario"):
        w = Wrapper()
        x = w.delete(tabella = tabella, value = key)
        if x["Esito"] == "Positivo":
            cherrypy.request.status = 200
        else:
            cherrypy.request.status = 404
        return x

conf = {
    '/': {
        'request.dispatch': cherrypy.dispatch.MethodDispatcher(),
        'tools.sessions.on': True,
        'tools.response_headers.on': True,
        'tools.response_headers.headers': [
            ('Access-Control-Allow-Origin', '*'), 
            ("Access-Control-Allow-Headers", "ngrok-skip-browser-warning")
        ],
    }
}  
    
cherrypy.quickstart(Rest(), "/", conf)

