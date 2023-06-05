import pymssql

class Wrapper:

    conn = 0

    def __init__(self, server="0.tcp.eu.ngrok.io:12010", user="SA", password="matty2107", database="TestDB"):
        self.server = server
        self.user = user
        self.password = password
        self.database = database

    def connessione(self):
        try:
            Wrapper.conn = pymssql.connect(server = self.server, user = self.user, password = self.password, database = self.database)
            return Wrapper.conn
        except Exception as e:
            print(e)
            return 0
    
    def disconnessione(self, conn):
        try:
            conn.close()
        except Exception as e:
            print(e)

    def update(self, tabella = "V_Acquario", data = {}, value = 0):
        x = {}

        try:
            conn = self.connessione()
            cur = conn.cursor(as_dict = True)
            tabella = str(tabella).replace(" ", "")
            
            sql = "UPDATE " + tabella + " SET " 
            for i in data.keys():
                if type(data[i]) == str:
                    sql += str(i) + " = " + "%s,"
                else:
                    sql += str(i) + " = " + "%d,"
            print(sql)
            sql = sql[:-1]
            print(sql)
            sql += " WHERE " + str(self.get_pk(tabella = tabella)) + " = " 
            if type(value) == str:
                sql += "'" + str(value).replace(" ", "") + "'"
            else:
                sql += str(value).replace(" ", "")

            y = []
            for i in data.keys():
                y.append(data[i])
            
            y = tuple(y)
            print(sql)

            cur.execute(sql, y)
            conn.commit()
            print(cur.rowcount)
            if cur.rowcount > 0:
                x = {"Esito" : "Positivo"}
            else:
                x = {"Esito" : "Negativo"}
        except Exception as e:
            x = {"Esito" : "Invalido"}
            print(e)
        finally:
            self.disconnessione(conn)
            return x

    def delete(self, tabella = "V_Acquario", value = 0):
        x = {}

        try:
            conn = self.connessione()
            cur = conn.cursor(as_dict = True)
            tabella = str(tabella).replace(" ", "")
            
            sql = "DELETE FROM " + tabella + " WHERE " + str(self.get_pk(tabella = tabella)) + " = " + str(value).replace(" ", "")
            cur.execute(sql)
            conn.commit()
            print(cur.rowcount)
            if cur.rowcount > 0:
                x = {"Esito" : "Positivo"}
            else:
                x = {"Esito" : "Negativo"}
        except Exception as e:
            x = {"Esito" : "Invalido"}
            print(e)
        finally:
            self.disconnessione(conn)
            return x

    def insert(self, tabella = "V_Acquario", data = ("Siches",)):
        x = 0
        try:
            conn = self.connessione()
            cur = conn.cursor(as_dict = True)
            sql = "INSERT INTO " + str(tabella.replace(" ","")) + " VALUES ("
            for i in data:
                if type(i) == str:
                    sql += "%s,"
                else:
                    sql += "%d,"
            sql = sql[:-1]
            sql += ")"
            cur.execute(sql, data)
            conn.commit()
            x = {"Esito" : "Positivo"}
        except Exception as e:
            print(e)
            x = {"Esito" : "Invalido"}
        finally:
            self.disconnessione(conn)
            return x

    def fetch_all(self, tabella = "V_Acquario", as_dict = True):
        x = []
        
        try:
            conn = self.connessione()
            cur = conn.cursor(as_dict = as_dict)
            sql = "SELECT * FROM " + str(tabella).replace(" ", "")
            cur.execute(sql)
            x = cur.fetchall()
        except Exception as e:
            print(e)
        finally:
            self.disconnessione(conn)
            return x

    def fetch(self, tabella = "V_Acquario", as_dict = True, value = 1):
        x = {}

        try:
            conn = self.connessione()
            cur = conn.cursor(as_dict = as_dict)
            tabella = str(tabella).replace(" ", "")
            
            sql = "SELECT * FROM " + tabella + " WHERE " + str(self.get_pk(tabella = tabella)) + " = " + str(value).replace(" ", "")
            cur.execute(sql)
            x = cur.fetchone()
        except Exception as e:
            print(e)
        finally:
            self.disconnessione(conn)
            return x

    def get_pk(self, tabella = "V_Acquario", as_dict = True):
        try:
            conn = self.connessione()
            cur = conn.cursor(as_dict = as_dict)
            tabella = str(tabella).replace(" ", "")
            sql = """
                SELECT Col.Column_Name from 
                    INFORMATION_SCHEMA.TABLE_CONSTRAINTS Tab, 
                    INFORMATION_SCHEMA.CONSTRAINT_COLUMN_USAGE Col 
                WHERE 
                    Col.Constraint_Name = Tab.Constraint_Name
                    AND Col.Table_Name = Tab.Table_Name
                    AND Tab.Constraint_Type = 'PRIMARY KEY'
                    AND Col.Table_Name = '""" + tabella + "'"
            
            cur.execute(sql)
            field = cur.fetchone()
        except Exception as e:
            print(e)
        finally:
            self.disconnessione(conn)
            return field["Column_Name"]
        
        
w = Wrapper() 
print(w.fetch_all("xxx"))



