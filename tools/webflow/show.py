import re
import json
p=json.load(open('payload.json'))
V='variable-565862fb-586c-0d1b-e673-ae6db8735002'
acts=[]
for i,f in enumerate(p['fixes']):
    a={'style_name':f['style_name'],'properties':[{'property_name':x,'variable_as_value':V} for x in f['props']]}
    if f['parent_style_names']: a['parent_style_names']=f['parent_style_names']
    if f['breakpoint_id']: a['breakpoint_id']=f['breakpoint_id']
    if f['pseudo']: a['pseudo']=f['pseudo']
    acts.append({'label':f'fix{i}','update_style':a})
h=re.sub(r'>\s+<','><',p['html']); h=re.sub(r'\s+',' ',h)
c=re.sub(r'\n\s+',' ',p['css'])
print('HTML',json.dumps(h,ensure_ascii=False)); print('CSS',json.dumps(c,ensure_ascii=False))
print('FIXES', json.dumps(acts))
