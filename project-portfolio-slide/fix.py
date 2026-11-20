import zipfile,shutil,re,sys
src=sys.argv[1]; tmp=src+'.tmp'
zi=zipfile.ZipFile(src); zo=zipfile.ZipFile(tmp,'w',zipfile.ZIP_DEFLATED)
def para(m):
    p=m.group(0); seen=[False]
    def k(mm):
        if seen[0]: return ''
        seen[0]=True; return mm.group(0)
    return re.sub(r'<a:pPr\b[^>]*/>|<a:pPr\b[^>]*>.*?</a:pPr>',k,p)
for it in zi.infolist():
    if it.filename.endswith('/'): continue
    d=zi.read(it.filename)
    if it.filename.startswith('ppt/slides/slide') and it.filename.endswith('.xml'):
        t=d.decode()
        t=re.sub(r'<a:p>.*?</a:p>',para,t,flags=re.S)
        t=t.replace('<a:buSzPct val="100000"/><a:buChar','<a:buClr><a:srgbClr val="1F5E57"/></a:buClr><a:buSzPct val="100000"/><a:buFont typeface="Arial"/><a:buChar')
        d=t.encode()
    zo.writestr(it,d)
zo.close(); shutil.move(tmp,src)
