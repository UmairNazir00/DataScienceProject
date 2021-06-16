import sys
import subprocess

subprocess.check_call([sys.executable, '-m', 'pip', 'install', 
'pandas'])

subprocess.check_call([sys.executable, '-m', 'pip', 'install', 
'numpy'])



import pandas as pd
import numpy as np

df1 = pd.read_csv("modifiedPropertyDataset.csv")
locations = df1.location.unique()
listLocations = list(locations)

from sklearn.tree import DecisionTreeRegressor
from sklearn import preprocessing
from sklearn.model_selection import train_test_split

X = df1.drop(['price'],axis='columns')
y = df1.price

enc = preprocessing.OrdinalEncoder()
enc.fit(X)
tranformX = enc.transform(X)

X_train, X_test, y_train, y_test = train_test_split(tranformX,y,test_size=0.2,random_state=10)

model = DecisionTreeRegressor(random_state=0)

model.fit(X_train,y_train)

try:
    guess = pd.DataFrame([[sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4], int(sys.argv[5]), float(sys.argv[6]), sys.argv[7], int(sys.argv[8])]])
    prediction = model.predict(enc.transform(guess))
    price = np.array_str(prediction)
    listLocations.append(price)
    print(listLocations)
except:
    print(listLocations)