:START
timeout /t 4
SET /A test=%RANDOM% * 10 / 32768 + 1
IF %test%==1 (GOTO STAND)
IF %test%==2 (GOTO STAND)
IF %test%==3 (GOTO STAND)
IF %test%==4 (GOTO STAND)
IF %test%==5 (GOTO STAND)
IF %test%==6 (GOTO STAND)
IF %test%==7 (GOTO STAND)
IF %test%==8 (GOTO STAND)
IF %test%==9 (GOTO LAY)
IF %test%==10 (GOTO LAY)

:STAND
blender --background models\bases\stand.blend --python server\gen_model_stand.py )
echo "Generate one."
GOTO START

:LAY
blender --background models\bases\laying.blend --python server\gen_model_laying.py )
echo "Generated one."
GOTO START