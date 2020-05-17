---
title: "{{ replace .Name "-" " " | title }}"
description: "{{ replace .Name "-" " " | title }}"
draft: true
date: {{ .Date }}
expires: {{ .Date }}
salary: "₹ 10,000 - ₹ 15,000"
locations: ["Delhi-NCR"]
qualifications: ["10th", "12th"]
categories: ["BPO", "Data Entry"]
apply: "mailto:{{.Site.Params.email}}"
jobId: "1234"
---