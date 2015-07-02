import os
import sys
import urlparse
import hashlib
from config import config
from pymongo import MongoClient, DESCENDING
#############
#Global Vars#
#############
client = MongoClient(config['server'], config['port'])
chomp = client.chomp
completed_surveys = chomp.completed_surveys


fixed = "localhost:5000/?survey="
num_surveys_to_gen = int(raw_input("How many surveys do you want to generate?>> "))
survey_name = str(raw_input("What is the name of your survey?>> "))

survey_id_list = []
def gen_survey_id(survey_name, num_surveys_to_gen):
	for x in range(0, num_surveys_to_gen):
		str_num_to_gen = str(x)
		survey_id = survey_name + str_num_to_gen
		survey_id_list.append(survey_id)

survey_url_list = []
def gen_url_from_survey_id(survey_id):
	for survey_id in survey_id_list:
		survey_url = fixed + str(hashlib.md5(survey_id).hexdigest())
		survey_url_list.append(survey_url)
		print survey_url
		print survey_url_list


#last task#
#push the ids to the completed_surveys collection
#pass the template_id in as well 
#template_id is a number corresponding to each template so 1, 2, 3, ... etc
#

def push_ids_to_collection():
	#url_id = units.insert_one(unit).inserted_id
	for url_hash_id in survey_url_list:
		completed_surveys.insert({"id":url_hash_id})

if __name__ == '__main__':
	gen_survey_id(survey_name, num_surveys_to_gen)
	gen_url_from_survey_id(survey_name)
	push_ids_to_collection()
