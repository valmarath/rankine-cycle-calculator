import sys
import CoolProp.CoolProp as cp

#inputs
cycleProperties = str(sys.argv[1])
fluid = str(sys.argv[2])
input1 = str(sys.argv[3])
value1 = float(sys.argv[4])
input2 = str(sys.argv[5])
value2 = float(sys.argv[6])
input3 = str(sys.argv[7])
value3 = float(sys.argv[8])

if input1 == 'Temperature':
    input1 = 'T'
elif input1 == 'Pressure':
    input1 = 'P'
if input2 == 'Temperature':
    input2 = 'T'
elif input2 == 'Pressure':
    input2 = 'P'
if input3 == 'Temperature':
    input3 = 'T'
elif input3 == 'Pressure':
    input3 = 'P'

if cycleProperties == 'RSI_1':
    # 1
    p1 = cp.PropsSI('P', input3, value3, 'Q', 0, fluid)
    density1 = cp.PropsSI('D', input3, value3, 'Q', 0, fluid)
    h1 = cp.PropsSI('H', input3, value3, 'Q', 0, fluid)
    sl1 = cp.PropsSI('S', input3, value3, 'Q', 0, fluid)

    # 3
    p3 = cp.PropsSI('P', input1, value1, input2, value2, fluid)
    h3 = cp.PropsSI('H', input1, value1, input2, value2, fluid)
    s3 = cp.PropsSI('S', input1, value1, input2, value2, fluid)

    # 4
    hv4 = cp.PropsSI('H', input3, value3, 'Q', 1, fluid)
    sv4 = cp.PropsSI('S', input3, value3, 'Q', 1, fluid)

    print(p1,density1,h1,sl1,p3,h3,s3,hv4,sv4)

elif cycleProperties == 'RSI_2': 
    # 1
    density1 = cp.PropsSI('D', input3, value3, 'Q', 0, fluid)
    h1 = cp.PropsSI('H', input3, value3, 'Q', 0, fluid)
    sl1 = cp.PropsSI('S', input3, value3, 'Q', 0, fluid)

    # 3
    p3 = cp.PropsSI('P', input1, value1, input2, value2, fluid)
    h3 = cp.PropsSI('H', input1, value1, input2, value2, fluid)
    s3 = cp.PropsSI('S', input1, value1, input2, value2, fluid)

    # 4
    hv4 = cp.PropsSI('H', input3, value3, 'Q', 1, fluid)
    sv4 = cp.PropsSI('S', input3, value3, 'Q', 1, fluid)

    print(density1,h1,sl1,p3,h3,s3,hv4,sv4)

elif (cycleProperties == 'RRI_1') or (cycleProperties == 'RRI_2'): 
    input4 = str(sys.argv[9])
    value4 = float(sys.argv[10])
    input5 = str(sys.argv[11])
    value5 = float(sys.argv[12])
    
    if input4 == 'Temperature':
        input4 = 'T'
    elif input4 == 'Pressure':
        input4 = 'P'
    if input5 == 'Temperature':
        input5 = 'T'
    elif input5 == 'Pressure':
        input5 = 'P'
    
    # 1
    p1 = cp.PropsSI('P', input3, value3, 'Q', 0, fluid)
    density1 = cp.PropsSI('D', input3, value3, 'Q', 0, fluid)
    h1 = cp.PropsSI('H', input3, value3, 'Q', 0, fluid)
    hv1 = cp.PropsSI('H', input3, value3, 'Q', 1, fluid)
    sl1 = cp.PropsSI('S', input3, value3, 'Q', 0, fluid)
    sv1 = cp.PropsSI('S', input3, value3, 'Q', 1, fluid)

    # 3
    h3 = cp.PropsSI('H', input1, value1, input2, value2, fluid)
    s3 = cp.PropsSI('S', input1, value1, input2, value2, fluid)

    # 4
    sl4 = cp.PropsSI('S', input4, value4, 'Q', 0, fluid)
    sv4 = cp.PropsSI('S', input4, value4, 'Q', 1, fluid)
    hl4 = cp.PropsSI('H', input4, value4, 'Q', 0, fluid)
    hv4 = cp.PropsSI('H', input4, value4, 'Q', 1, fluid)
    h4s3 = cp.PropsSI('H', input4, value4, 'S', s3, fluid)


    # 5
    h5 = cp.PropsSI('H', input4, value4, input5, value5, fluid)
    s5 = cp.PropsSI('S', input4, value4, input5, value5, fluid)
    
    #6
    h6 = cp.PropsSI('H', input3, value3, 'S', s5, fluid)

    print(p1,density1,h1,hv1,sl1,sv1,h3,s3,hl4,hv4,h4s3,sl4,sv4,h5,s5, h6)

elif (cycleProperties == 'RRR_1'): 
    input4 = str(sys.argv[9])
    value4 = float(sys.argv[10])
    input5 = str(sys.argv[11])
    value5 = float(sys.argv[12])
    input6 = str(sys.argv[13])
    value6 = float(sys.argv[14])
    value7 = float(sys.argv[15])

    
    if input4 == 'Temperature':
        input4 = 'T'
    elif input4 == 'Pressure':
        input4 = 'P'
    if input5 == 'Temperature':
        input5 = 'T'
    elif input5 == 'Pressure':
        input5 = 'P'
    if input6 == 'Temperature':
        input6 = 'T'
    elif input6 == 'Pressure':
        input6 = 'P'
    
    # 1
    p1 = cp.PropsSI('P', input4, value4, 'Q', 0, fluid)
    density1 = cp.PropsSI('D', input4, value4, 'Q', 0, fluid)
    h1 = cp.PropsSI('H', input4, value4, 'Q', 0, fluid)
    hv1 = cp.PropsSI('H', input4, value4, 'Q', 1, fluid)
    sl1 = cp.PropsSI('S', input4, value4, 'Q', 0, fluid)
    sv1 = cp.PropsSI('S', input4, value4, 'Q', 1, fluid)

    # 3
    h3 = cp.PropsSI('H', input1, value1, input2, value2, fluid)
    s3 = cp.PropsSI('S', input1, value1, input2, value2, fluid)

    # 4S
    sl4 = cp.PropsSI('S', input3, value3, 'Q', 0, fluid)
    sv4 = cp.PropsSI('S', input3, value3, 'Q', 1, fluid)
    hl4 = cp.PropsSI('H', input3, value3, 'Q', 0, fluid)
    hv4 = cp.PropsSI('H', input3, value3, 'Q', 1, fluid)
    h4s3 = cp.PropsSI('H', input3, value3, 'S', s3, fluid)

    #4R
    h4r = cp.PropsSI('H', input3, value3, input6, value6, fluid)

    # 5
    h5 = cp.PropsSI('H', input3, value3, input5, value5, fluid)
    s5 = cp.PropsSI('S', input3, value3, input5, value5, fluid)
    
    #6S
    h6s = ''
    #6R
    if (sv1 > s5):
        x6 = (s5-sl1)/(sv1-sl1)
        h6s = h1+(x6*(hv1-h1))
    else:
        h6s = cp.PropsSI('H', input3, value3, 'S', s5, fluid)
    
    h6r = -1*(((value7/100)*(h5-h6s))-h5)

    t6r = cp.PropsSI('T', 'H', h6r, input4, value4, fluid)
    
    print(p1,density1,h1,hv1,sl1,sv1,h3,s3,hl4,hv4,h4s3,sl4,sv4,h5,s5,h6s,h4r,h6r,t6r)
    
elif (cycleProperties == 'RRR_2'): 
    input4 = str(sys.argv[9])
    value4 = float(sys.argv[10])
    input5 = str(sys.argv[11])
    value5 = float(sys.argv[12])
    input6 = str(sys.argv[13])
    value6 = float(sys.argv[14])

    
    if input4 == 'Temperature':
        input4 = 'T'
    elif input4 == 'Pressure':
        input4 = 'P'
    if input5 == 'Temperature':
        input5 = 'T'
    elif input5 == 'Pressure':
        input5 = 'P'
    if input6 == 'Temperature':
        input6 = 'T'
    elif input6 == 'Pressure':
        input6 = 'P'
    
    # 1
    p1 = cp.PropsSI('P', input4, value4, 'Q', 0, fluid)
    density1 = cp.PropsSI('D', input4, value4, 'Q', 0, fluid)
    h1 = cp.PropsSI('H', input4, value4, 'Q', 0, fluid)
    hv1 = cp.PropsSI('H', input4, value4, 'Q', 1, fluid)
    sl1 = cp.PropsSI('S', input4, value4, 'Q', 0, fluid)
    sv1 = cp.PropsSI('S', input4, value4, 'Q', 1, fluid)

    # 3
    h3 = cp.PropsSI('H', input1, value1, input2, value2, fluid)
    s3 = cp.PropsSI('S', input1, value1, input2, value2, fluid)

    # 4S
    sl4 = cp.PropsSI('S', input3, value3, 'Q', 0, fluid)
    sv4 = cp.PropsSI('S', input3, value3, 'Q', 1, fluid)
    hl4 = cp.PropsSI('H', input3, value3, 'Q', 0, fluid)
    hv4 = cp.PropsSI('H', input3, value3, 'Q', 1, fluid)
    h4s3 = cp.PropsSI('H', input3, value3, 'S', s3, fluid)

    #4R
    h4r = cp.PropsSI('H', input3, value3, input6, value6, fluid)

    # 5
    h5 = cp.PropsSI('H', input3, value3, input5, value5, fluid)
    s5 = cp.PropsSI('S', input3, value3, input5, value5, fluid)
    
    #6S
    h6s = ''
    #6R
    if (sv1 > s5):
        x6 = (s5-sl1)/(sv1-sl1)
        h6s = h1+(x6*(hv1-h1))
    else:
        h6s = cp.PropsSI('H', input3, value3, 'S', s5, fluid)
    
    
    print(p1,density1,h1,hv1,sl1,sv1,h3,s3,hl4,hv4,h4s3,sl4,sv4,h5,s5,h6s,h4r)