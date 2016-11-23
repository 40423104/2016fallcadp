var tipuesearch = {"pages":[{"text":"2016Fall 電腦輔助設計實習課程 本課程主要教導機械設計工程系大二學生下列內容: Solvespace 零組件設計, 機構模擬, C++ 原始碼 Windows 與 Ubuntu 環境下編譯, API 程式庫延伸 OnShape 零組件設計, 雲端協同設計, 機構模擬 Delta 3D 印表機機構設計, 機電控制, 零組件列印 Python3 程式在機構設計模擬上的應用, 包括單機執行, Jupyter 環境執行, Jupyterhub 環境執行與 Brython 環境執行 課程倉儲: http://github.com/mdecourse/2016fallcadp 課程投影片: http://mdecourse.github.io/2016fallcadp 課程網誌: http://mdecourse.github.io/2016fallcadp/blog","tags":"misc","title":"About","url":"./pages/about/"},{"text":"電腦輔助設計流程中, 利用 git submodule 指令, 可以整合組員所提供的設計資料、設計程式與設計零組件. 引用子模組中的四連桿繞行軌跡點座標資料, 進行繪圖的範例: https://scrum-1.github.io/2016fallcadp_ag100/blog/git-submodule-zai-dian-nao-fu-zhu-she-ji-shang-de-ying-yong.html 引用組員設計程式的範例: 引用組員的設計零組件範例: 利用 github 所提供的 stl 零件格式展示, 或 Solvespace 的零件 .js 格式, 將組員分別完成的 OnShape 課程零組件, 透過子模組設定, 展示在各分組的網誌中.","tags":"Misc","title":"利用 Git submodule 功能進行組員資料設計整合","url":"./li-yong-git-submodule-gong-neng-jin-xing-zu-yuan-zi-liao-she-ji-zheng-he.html"},{"text":"Brython 動畫測試 window.onload=function(){ brython(1); } from browser import window, timer, document, html import time t0 = time.time() def user_agent(): \"\"\" Helper function for determining the user agent \"\"\" if window.navigator.userAgent.find('Chrome'): return 'chrome' elif window.navigator.userAgent.find('Firefox'): return 'firefox' elif window.navigator.userAgent.find('MSIE'): return 'msie' elif window.navigator.userAgent.find('Opera'): return 'opera' # Dict Mapping UserAgents to Transform Property names # 在不同的瀏覽器, 有不同的 transform 名稱 rotate_property = { 'chrome':'WebkitTransform', 'firefox':'MozTransform', 'msie':'msTransform', 'opera':'OTransform' } degrees = 0 def animation_step(elem_id): \"\"\" Called every 30msec to increase the rotatation of the element. \"\"\" global degrees, tm # Get the right property name according to the useragent agent = user_agent() prop = rotate_property.get(agent,'transform') # Get the element by id el = document[elem_id] # Set the rotation of the element # 設定 element 的旋轉屬性 setattr(el.style, prop, \"rotate(\"+str(degrees)+\"deg)\") # 將旋轉角度寫在 id 為 status 的區域 document['status'].innerHTML = \"rotate(\"+str(degrees)+\" deg)\" # Increase the rotation degrees += 1 if degrees > 360: # Stops the animation after 360 steps timer.clear_interval(tm) degrees = 0 # Start the animation # 每 30 msec 重新刷新繪圖 tm = timer.set_interval(lambda id='img1':animation_step(id), 30) # 將執行所花費時間, 寫在 id=\"status3\" 的標註區域 document['status3'].innerHTML = \"執行所花費時間: (\"+str(time.time()-t0)+\" ms)\"","tags":"Misc","title":"Brython 動畫測試","url":"./brython-dong-hua-ce-shi.html"},{"text":"經過 9 個禮拜, 電腦輔助設計實習課程到底學到什麼? 沒有 OpenShift 與 copy.com 之後 首先必須說明的是, 本課程在 2016 Fall, 為了因應 OpenShift 無法提供每一個學員免費雲端空間, 而且 copy.com 也終止服務之後, 從電腦輔助設計實習走向協同產品設計實習, 只剩下 Github 以及自己架設的伺服器. 因此本學期的所有教學運作全部在 Github 平台上執行, 每一位學員都必須申請 Github 帳號, 並且利用 html5 以及 Javascript 來維護自己倉儲中 gh-pages 分支上的資料. 面對這樣的轉變, 在目前這個 Leo Editor 專案中, 特別建立了一個近端的 https 伺服器按鈕, 而且為了能夠獨立於 Leo Editor 運作, 特別採用執行緒的架構編寫: import os import subprocess import threading import http.server, ssl def domake(): # build directory os.chdir(\"./../\") server_address = ('localhost', 8443) httpd = http.server.HTTPServer(server_address, http.server.SimpleHTTPRequestHandler) httpd.socket = ssl.wrap_socket(httpd.socket, server_side=True, certfile='localhost.crt', keyfile='localhost.key', ssl_version=ssl.PROTOCOL_TLSv1) print(\"8443 https server started\") httpd.serve_forever() # 利用執行緒執行 https 伺服器 make = threading.Thread(target=domake) make.start() 使用者只要將滑鼠停在 https-server 按鈕所在節點, 然後按下 Leo Editor 上方的對應按鈕, 就可以在近端電腦上執行一個 https 伺服器, 啟動之後, 只要利用瀏覽器連結 https://localhost:8443, 就可以得到與 Github pages 上相同的執行結果. 儘管在這個 https 伺服器中只能運行 html5 與 Javascript, 但是為了配合計算機程式的 Python3, 電腦輔助設計實習並不直接讓學員編寫 Javascript, 而是透過 Brython 執行網頁上的 Python3 格式程式, 本學期主要透過 html5 中的 canvas 繪圖來模擬平面多連桿機構的運動, 並且利用 Solvespace 與 OnShape 結合 V-rep 進行驗證, 當然最終理想, 是可以將平面多連桿機構以 3D 印表機列印出零組件, 然後透過步進馬達驅動, 讓學員有機會接觸機電資 (InfoRmechAtronic) 整合的實習. 另外, 由於 2016 Fall CADP 課程規劃為一個全新的內容組合, 從 Github Pages 的網誌搭建作為開端, reveal.js 的網際投影片作為輔助簡報, 至於 Github Wiki 則充當數位筆記本, 專門用來收集零碎的參考資料. 上述 Pelican 網誌、reveal.js 簡報與 Github Wiki 其實有許多重複的展示資料, 原本可以透過 Leo Editor 的 clone node 與 Github 的 本地 wiki 維護 說明, 統一整合在 Leo Editor 專案中, 但是需要 @clean 與 @others 以及命名節點等進階 Leo 指令的導入, 目前尚未納入課程. Git submodule 的應用 這個學期首度在 CADP 課程中導入 git submodule, 主要是為了配合協同設計流程中的模擬程式呼叫, 讓組員間可以透過子模組的架構, 決定程式與設計資料的版次後, 彼此引用協同資料. 只是目前採用全班分組子模組的架構, 只要一個組員設定出錯, 全班的 gh-pages 網頁就無法更新, 因此從第 11 週起, 將改為組員自行建立子模組的程式與資料協同, 然後擴充到各組, 若各組運作正常, 待協同產品設計實習課程階段, 再推展到班級子模組協同. 最後, 本課程網誌前面各筆資料的大架構雖然已經決定, 但是執行細節與範圍仍然必須配合學員的學習結果, 再逐一放入內容, 因此, 各筆資料在課程結束之前, 將會持續更新.","tags":"Misc","title":"2016Fall 期中摘要","url":"./2016fall-qi-zhong-zhai-yao.html"},{"text":"各組自行透過 http://tw.misumi-ec.com/ 尋找適用的標準零件, 下載 2D 與 3D 零件圖檔, 利用 Solvespace 與 OnShape 進行設計組立與模擬後, 實際下單購買各零組件, 完成 3D 印表機的設計與實作.","tags":"Misc","title":"2016Fall Delta 3D 印表機設計","url":"./2016fall-delta-3d-yin-biao-ji-she-ji.html"},{"text":"有關 Onshape 零件, 組件, 機構模擬等功能介紹, FeatureScript 與協同設計等 各組以每週完成 3 個 weeks 的 Onshape 標準 College Curriculum 教材後, 根據 http://chiamingyen.github.io/kmolab_data/files/ProEMechanism.pdf 說明完成零件繪製與組立後, 如何精確得知機構運動過程的約束位置?","tags":"Misc","title":"2016Fall Onshape 教學","url":"./2016fall-onshape-jiao-xue.html"},{"text":"有關 Solvespace 機構模擬功能介紹, 與 Python3 及 Brython 程式驗證 Solvespace 平面四連桿機構模擬 直接利用 Solvespace Analyze-Trace Point-Stop Trace 得到下列繞行路徑: 將所得到的點座標 .csv 以 Excel 畫圖, 得到: Python3 平面四連桿機構模擬: 接下來利用三角函數推導四連桿機構的運動模擬, 即已知長度 18 公分的連桿以逆時針方向旋轉, 希望求三角形頂點的運動座標. 首先利用 Brython, 讀取 data 目錄中的 cadpa_w10_4bar.csv 座標檔案, 然後以 splitlines() 及 split() 取出各點的 x 座標與 y 座標後, 將點連成路徑曲線如下: window.onload=function(){ brython(1); } from browser import document as doc from browser import html import math # 準備繪圖畫布 canvas = doc[\"fourbar\"] container1 = doc['container1'] ctx = canvas.getContext(\"2d\") fourbar_data = open(\"./../data/cadpa_w10_4bar.csv\").read() fourbar_list = fourbar_data.splitlines() #container1 <= fourbar_list[0] # 以下可以利用 ctx 物件進行畫圖 # 先畫一條直線 ctx.beginPath() # 設定線的寬度為 1 個單位 ctx.lineWidth = 1 # 利用 transform 將 y 座標反轉, 且 offset canvas.height # (X scale, X skew, Y skew, Y scale, X offset, Y offset) # 配合圖形位置進行座標轉換 ctx.transform(1, 0, 0, -1, canvas.width/2+250, canvas.height/2+100) # 畫出 x 與 y 座標線 # 各座標值放大 8 倍 ratio = 8 ''' ctx.moveTo(0, 0) ctx.lineTo(0, 100) ctx.moveTo(0, 0) ctx.lineTo(100, 0) ''' ctx.moveTo(0, 0) ctx.lineTo(-30*ratio, 0) start_point = fourbar_list[0].split(\",\") ctx.moveTo(float(start_point[0])*ratio, float(start_point[1])*ratio) count = 0 for data in fourbar_list[1:]: point = data.split(\",\") #count = count + 1 #container1 <= str(count) + \":\" + point[0] + \",\" + point[1] #container1 <= html.BR() ctx.lineTo(float(point[0])*ratio, float(point[1])*ratio) # 設定顏色為藍色, 也可以使用 \"rgb(0, 0, 255)\" 字串設定顏色值 ctx.strokeStyle = \"blue\" # 實際執行畫線 ctx.stroke() ctx.closePath() Ubuntu 安裝 matplotlib: sudo apt-get install python3-matplotlib import math import time # 利用 matplotlib 程式庫畫出 contour 輪廓 import matplotlib.pyplot as plt class Coord(object): def __init__(self,x,y): self.x = x self.y = y def __sub__(self,other): # This allows you to substract vectors return Coord(self.x-other.x,self.y-other.y) def __repr__(self): # Used to get human readable coordinates when printing return \"Coord(%f,%f)\"%(self.x,self.y) def length(self): # Returns the length of the vector return math.sqrt(self.x**2 + self.y**2) def angle(self): # Returns the vector's angle return math.atan2(self.y,self.x) def normalize(coord): return Coord( coord.x/coord.length(), coord.y/coord.length() ) def perpendicular(coord): # Shifts the angle by pi/2 and calculate the coordinates # using the original vector length return Coord( coord.length()*math.cos(coord.angle()+math.pi/2), coord.length()*math.sin(coord.angle()+math.pi/2) ) # 點類別 class Point(object): # 起始方法 def __init__(self, x, y): self.x = x self.y = y # 加入 Eq 方法 def Eq(self, pt): self.x = pt.x self.y = pt.y # 加入 setPoint 方法 def setPoint(self, px, py): self.x = px self.y = py # 加上 distance(pt) 方法, 計算點到 pt 的距離 def distance(self, pt): self.pt = pt x = self.x - self.pt.x y = self.y - self.pt.y return math.sqrt(x * x + y * y) # Line 類別物件 class Line(object): # 起始方法 def __init__(self, p1, p2): self.p1 = p1 self.p2 = p2 # 直線的第一點, 設為線尾 self.Tail = self.p1 # 直線組成的第二點, 設為線頭 self.Head = self.p2 # 直線的長度屬性 self.length = math.sqrt(math.pow(self.p2.x-self.p1.x, 2)+math.pow(self.p2.y-self.p1.y,2)) # setPP 以指定頭尾座標點來定義直線 def setPP(self, p1, p2): self.p1 = p1 self.p2 = p2 self.Tail = self.p1 self.Head = self.p2 self.length = math.sqrt(math.pow(self.p2.x-self.p1.x, 2)+math.pow(self.p2.y-self.p1.y,2)) # setRT 方法 for Line, 應該已經確定 Tail 點, 然後以 r, t 作為設定 Head 的參考 def setRT(self, r, t): self.r = r self.t = t x = self.r * math.cos(self.t) y = self.r * math.sin(self.t) self.Tail.Eq(self.p1) self.Head.setPoint(self.Tail.x + x,self.Tail.y + y) # getR 方法 for Line def getR(self): # x 分量與 y 分量 x = self.p1.x - self.p2.x y = self.p1.y - self.p2.y return math.sqrt(x * x + y * y) # 根據定義 atan2(y,x), 表示 (x,y) 與 正 x 軸之間的夾角, 介於 pi 與 -pi 間 def getT(self): x = self.p2.x - self.p1.x y = self.p2.y - self.p1.y if (math.fabs(x) < math.pow(10,-100)): if(y < 0.0): return (-math.pi/2) else: return (math.pi/2) else: return math.atan2(y, x) # setTail 方法 for Line def setTail(self, pt): self.pt = pt self.Tail.Eq(pt) self.Head.setPoint(self.pt.x + self.x, self.pt.y + self.y) # getHead 方法 for Line def getHead(self): return self.Head def getTail(self): return self.Tail class Link(Line): def __init__(self, p1, p2): self.p1 = p1 self.p2 = p2 self.length = math.sqrt(math.pow((self.p2.x - self.p1.x), 2) + math.pow((self.p2.y - self.p1.y), 2)) class Triangle(object): def __init__(self, p1, p2, p3): self.p1 = p1 self.p2 = p2 self.p3 = p3 def getLenp3(self): p1 = self.p1 ret = p1.distance(self.p2) return ret def getLenp1(self): p2 = self.p2 ret = p2.distance(self.p3) return ret def getLenp2(self): p1 = self.p1 ret = p1.distance(self.p3) return ret # 角度 def getAp1(self): ret = math.acos(((self.getLenp2() * self.getLenp2() + self.getLenp3() * self.getLenp3()) - self.getLenp1() * self.getLenp1()) / (2* self.getLenp2() * self.getLenp3())) return ret def getAp2(self): ret =math.acos(((self.getLenp1() * self.getLenp1() + self.getLenp3() * self.getLenp3()) - self.getLenp2() * self.getLenp2()) / (2* self.getLenp1() * self.getLenp3())) return ret def getAp3(self): ret = math.acos(((self.getLenp1() * self.getLenp1() + self.getLenp2() * self.getLenp2()) - self.getLenp3() * self.getLenp3()) / (2* self.getLenp1() * self.getLenp2())) return ret # ends Triangle def # 透過三個邊長定義三角形 def setSSS(self, lenp3, lenp1, lenp2): self.lenp3 = lenp3 self.lenp1 = lenp1 self.lenp2 = lenp2 self.ap1 = math.acos(((self.lenp2 * self.lenp2 + self.lenp3 * self.lenp3) - self.lenp1 * self.lenp1) / (2* self.lenp2 * self.lenp3)) self.ap2 = math.acos(((self.lenp1 * self.lenp1 + self.lenp3 * self.lenp3) - self.lenp2 * self.lenp2) / (2* self.lenp1 * self.lenp3)) self.ap3 = math.acos(((self.lenp1 * self.lenp1 + self.lenp2 * self.lenp2) - self.lenp3 * self.lenp3) / (2* self.lenp1 * self.lenp2)) # 透過兩個邊長與夾角定義三角形 def setSAS(self, lenp3, ap2, lenp1): self.lenp3 = lenp3 self.ap2 = ap2 self.lenp1 = lenp1 self.lenp2 = math.sqrt((self.lenp3 * self.lenp3 + self.lenp1 * self.lenp1) - 2* self.lenp3 * self.lenp1 * math.cos(self.ap2)) #等於 SSS(AB, BC, CA) def setSaSS(self, lenp2, lenp3, lenp1): self.lenp2 = lenp2 self.lenp3 = lenp3 self.lenp1 = lenp1 if(self.lenp1 > (self.lenp2 + self.lenp3)): #CAB 夾角為 180 度, 三點共線且 A 介於 BC 之間 ret = math.pi else : # CAB 夾角為 0, 三點共線且 A 不在 BC 之間 if((self.lenp1 < (self.lenp2 - self.lenp3)) or (self.lenp1 < (self.lenp3 - self.lenp2))): ret = 0.0 else : # 透過餘絃定理求出夾角 CAB ret = math.acos(((self.lenp2 * self.lenp2 + self.lenp3 * self.lenp3) - self.lenp1 * self.lenp1) / (2 * self.lenp2 * self.lenp3)) return ret # 取得三角形的三個邊長值 def getSSS(self): temp = [] temp.append( self.getLenp1() ) temp.append( self.getLenp2() ) temp.append( self.getLenp3() ) return temp # 取得三角形的三個角度值 def getAAA(self): temp = [] temp.append( self.getAp1() ) temp.append( self.getAp2() ) temp.append( self.getAp3() ) return temp # 取得三角形的三個角度與三個邊長 def getASASAS(self): temp = [] temp.append(self.getAp1()) temp.append(self.getLenp1()) temp.append(self.getAp2()) temp.append(self.getLenp2()) temp.append(self.getAp3()) temp.append(self.getLenp3()) return temp #2P 2L return mid P def setPPSS(self, p1, p3, lenp1, lenp3): temp = [] self.p1 = p1 self.p3 = p3 self.lenp1 = lenp1 self.lenp3 = lenp3 #bp3 is the angle beside p3 point, cp3 is the angle for line23, p2 is the output line31 = Line(p3, p1) self.lenp2 = line31.getR() #self.lenp2 = self.p3.distance(self.p1) #這裡是求角3 ap3 = math.acos(((self.lenp1 * self.lenp1 + self.lenp2 * self.lenp2) - self.lenp3 * self.lenp3) / (2 * self.lenp1 * self.lenp2)) #ap3 = math.acos(((self.lenp1 * self.lenp1 + self.lenp3 * self.lenp3) - self.lenp2 * self.lenp2) / (2 * self.lenp1 * self.lenp3)) bp3 = line31.getT() cp3 = bp3 - ap3 temp.append(p3.x + self.lenp1*math.cos(cp3))#p2.x temp.append(p3.y + self.lenp1*math.sin(cp3))#p2.y return temp # 以上為相關函式物件的定義區 # 全域變數 midpt = Point(0, 0) tippt = Point(0, 0) contour = [] # 幾何位置輸入變數 x=10 y=10 r=10 # 其他輸入變數 theta = 0 degree = math.pi/180.0 dx = 2 dy = 4 #set p1.p2.p3.p4 position p1 = Point(150,100) p2 = Point(150,200) p3 = Point(300,300) p4 = Point(350,100) #create links line1 = Link(p1,p2) line2 = Link(p2,p3) line3 = Link(p3,p4) line4 = Link(p1,p4) line5 = Link(p2,p4) link2_len = p2.distance(p3) link3_len = p3.distance(p4) triangle1 = Triangle(p1,p2,p4) triangle2 = Triangle(p2,p3,p4) def simulate(): global theta, midpt, oldpt theta += dx p2.x = p1.x + line1.length*math.cos(theta*degree) p2.y = p1.y - line1.length*math.sin(theta*degree) p3.x, p3.y = triangle2.setPPSS(p2,p4,link2_len,link3_len) # 計算垂直單位向量 a = Coord(p3.x, p3.y) b = Coord(p2.x, p2.y) normal = perpendicular(normalize(a-b)) midpt.x = (p2.x + p3.x)/2 midpt.y = (p2.y + p3.y)/2 tippt.x = midpt.x + 150*normal.x tippt.y = midpt.y + 150*normal.y # 印出座標點 #print(round(tippt.x, 2), round(tippt.y, 2)) if theta < 360: contour.append((round(tippt.x, 2), round(tippt.y, 2))) for i in range(180): simulate() # 印出 contour #print(contour) x_list = [x for (x, y) in contour] y_list = [y for (x, y) in contour] plt.xlabel('x coordinate') plt.ylabel('y coordinate') plt.plot(x_list, y_list) plt.show() 以下將上述四連桿模擬程式移到近端的 Jupyter 平台中執行: 以下將上述四連桿模擬程式移到 Jupyterhub 平台中執行: 以下再利用 Brython 繪出四連桿模擬特定點的掃掠圖: 以下利用 Brython 動態畫出四連桿機構模擬圖: 以下利用 Solvespace 繪圖法進行相同機構模擬驗證: 以下再利用 Solvespace 程式 API 方法進行四連桿模擬驗證: 以下以 Delta 3D 印表機印出連桿零件, 組立後以步進馬達驅動進行驗證: 以下利用伸縮連桿設計, 以 Delta 3D 印表機印出連桿零件, 組立後以步進馬達驅動進行驗證: 請以上述相同流程, 模擬並實作驗證 多連桿機構 的作動.","tags":"Misc","title":"2016Fall 平面機構模擬","url":"./2016fall-ping-mian-ji-gou-mo-ni.html"},{"text":"有關 Solvespace 零件, 組件, 機構模擬等功能介紹, 程式編譯與 API 延伸等","tags":"Misc","title":"2016Fall Solvespace 教學","url":"./2016fall-solvespace-jiao-xue.html"},{"text":"知識管理與最佳化應用實驗室試圖利用計算機程式、網際內容管理、電腦輔助設計實習與協同產品設計實習等課程, 進行與機械設計相關的主題式教學, 其中包含強化創造力的教學、令學員熟習六種工程表達方式, 並且俱備融入協同設計所需要的四大面向知識與技能. 機械設計主題教學 創造力三元素, 機械設計的六種表達, 協同設計的四大面向. 強化創造能力 - 自學力、程式力與想像力 (Creative Competencies) 熟習六種表達 - 口語、文字、2D、3D、理論與實體表達 (Six Presentation Methods) 融入協同設計 - 電腦、網路、軟硬體工具與協同專案 (Collaborative Designs) 2016 Fall CADP 課程資料檢視: 將要以 Brython 讀取兩班修課名單與分組名單, 並根據作業倉儲規劃, 以各班 submodule 分組檢視 (必須各組與各成員 submodule 設置正確): 各成員 submodule 架構檢視 (必須各組與各成員 submodule 設置正確): 各班各組直接檢視: 電腦輔助設計實習甲班成員連結: window.onload=function(){ brython(1); } 甲班學員投影片: from browser import document, html container1 = document['container1'] adata = open(\"./../users/a.txt\").read() alist = adata.splitlines() n = 0 for stud_num in alist: mlink = html.A(stud_num, href=\"http://\"+str(stud_num)+\".github.io/2016fallcadp_hw\") mlink += \" | \" n = n +1 if n%8 == 0: mlink += html.BR() container1 <= mlink 甲班學員網誌: from browser import document, html from script1 import alist container2 = document['container2'] n = 0 for stud_num in alist: mlink = html.A(stud_num, href=\"http://\"+str(stud_num)+\".github.io/2016fallcadp_hw/blog\") mlink += \" | \" n = n +1 if n%8 == 0: mlink += html.BR() container2 <= mlink 甲班學員 wiki: from browser import document, html from script1 import alist container3 = document['container3'] n = 0 for stud_num in alist: mlink = html.A(stud_num, href=\"http://github.com/\"+str(stud_num)+\"/2016fallcadp_hw/wiki\") mlink += \" | \" n = n +1 if n%8 == 0: mlink += html.BR() container3 <= mlink 甲班學員倉儲: from browser import document, html from script1 import alist container4 = document['container4'] n = 0 for stud_num in alist: mlink = html.A(stud_num, href=\"http://github.com/\"+str(stud_num)+\"/2016fallcadp_hw\") mlink += \" | \" n = n +1 if n%8 == 0: mlink += html.BR() container4 <= mlink 乙班學員投影片: from browser import document, html container5 = document['container5'] adata = open(\"./../users/b.txt\").read() alist = adata.splitlines() n = 0 for stud_num in alist: # 請注意, 這裡有例外 40223206 前頭必須加上 s # 40423239 前頭必須加上 a # 40423207 則之後要加上 7 if stud_num == '40223206': for_link = \"s\" + stud_num elif stud_num == '40423239': for_link = \"a\" + stud_num elif stud_num == '40423207': for_link = stud_num +\"7\" else: for_link = stud_num mlink = html.A(stud_num, href=\"http://\"+str(for_link)+\".github.io/2016fallcadp_hw\") mlink += \" | \" n = n +1 if n%8 == 0: mlink += html.BR() container5 <= mlink 乙班學員網誌: from browser import document, html from script5 import alist container6 = document['container6'] n = 0 for stud_num in alist: # 請注意, 這裡有例外 40223206 前頭必須加上 s # 40423239 前頭必須加上 a # 40423207 則之後要加上 7 if stud_num == '40223206': for_link = \"s\" + stud_num elif stud_num == '40423239': for_link = \"a\" + stud_num elif stud_num == '40423207': for_link = stud_num +\"7\" else: for_link = stud_num mlink = html.A(stud_num, href=\"http://\"+str(for_link)+\".github.io/2016fallcadp_hw/blog\") mlink += \" | \" n = n +1 if n%8 == 0: mlink += html.BR() container6 <= mlink 乙班學員 wiki: from browser import document, html from script5 import alist container7 = document['container7'] n = 0 for stud_num in alist: # 請注意, 這裡有例外 40223206 前頭必須加上 s # 40423239 前頭必須加上 a # 40423207 則之後要加上 7 if stud_num == '40223206': for_link = \"s\" + stud_num elif stud_num == '40423239': for_link = \"a\" + stud_num elif stud_num == '40423207': for_link = stud_num +\"7\" else: for_link = stud_num mlink = html.A(stud_num, href=\"http://github.com/\"+str(for_link)+\"/2016fallcadp_hw/wiki\") mlink += \" | \" n = n +1 if n%8 == 0: mlink += html.BR() container7 <= mlink 乙班學員倉儲: from browser import document, html from script5 import alist container8 = document['container8'] n = 0 for stud_num in alist: # 請注意, 這裡有例外 40223206 前頭必須加上 s # 40423239 前頭必須加上 a # 40423207 則之後要加上 7 if stud_num == '40223206': for_link = \"s\" + stud_num elif stud_num == '40423239': for_link = \"a\" + stud_num elif stud_num == '40423207': for_link = stud_num +\"7\" else: for_link = stud_num mlink = html.A(stud_num, href=\"http://github.com/\"+str(for_link)+\"/2016fallcadp_hw\") mlink += \" | \" n = n +1 if n%8 == 0: mlink += html.BR() container8 <= mlink 各班各組成員 submodule 架構檢視 (必須各組 submodule 設置正確: 各成員直接檢視: 以下為分組資料處理程式: content = open(\"2016fall_cadp_a_groups.txt\").read() #print(content) result = content.splitlines() #print(result) gno = 1 for i in range(len(result)): #print(result[i]) group = result[i].split(\":\") #列出組序 print(\"<a href='../g\"+str(gno)+\"'>第\"+str(gno)+\"組</a>:<br />\") #print(\"第\"+str(gno)+\"組:<br />\") #取 group 第2成員, 用逗點隔開納入數列後, 利用[:-1]去掉最後空白 #print(group[1].split(\",\")[:-1]) gmember = group[1].split(\",\")[:-1] for j in range(len(gmember)): #print(gmember[j]) print(\"<a href='../g\"+str(gno)+\"/\"+str(gmember[j])+\"'>\"+ \\ str(gmember[j])+\"</a> \") print(\"<br />\") gno = gno + 1","tags":"Misc","title":"2016Fall 機械設計主題教學","url":"./2016fall-ji-jie-she-ji-zhu-ti-jiao-xue.html"}]};