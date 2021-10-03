---
title: "python date and time"
date: 2019-02-02 14:20:30
categories: python
---

### 날짜와 시간
#### datetime module
- date: 년, 월, 일
- time: 시, 분, 초, 마이크로초
- datetime: 날짜와 시간
- timedelta: 날짜 와/또는 시간 간격

```python
from datetime import date
halloween = date(2019, 10, 31)
print(halloween)
print(halloween.day)
print(halloween.month)
print(halloween.year)

from datetime import timedelta
one_day = timedelta(days=1)
tomorrow = now+one_day
print(tomorrow)
print(now+17*one_day)
yesterday = now - one_day
print(yesterday)

from datetime import time 
noon = time(12,0,0)
print(noon)
print(noon.hour)
print(noon.minute)
print(noon.second)
print(noon.microsecond)

from datetime import datetime
some_day = datetime(2015, 1, 2, 3, 4, 5, 6)
print(some_day)
print(some_day.isoformat())
```
