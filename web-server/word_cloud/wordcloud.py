#!/usr/bin/env python
"""
Masked word_cloud_rename
================

Using a mask you can generate wordclouds in arbitrary shapes.
"""

from os import path
from PIL import Image
import numpy as np
import matplotlib.pyplot as plt
import os

from wordcloud import WordCloud, STOPWORDS

import multidict as multidict
import re


def get_cloud():
    def get_frequency_dict_for_text(sentence):
        fullTermsDict = multidict.MultiDict()
        tmpDict = {}

        # making dict for counting frequencies
        for text in sentence.split(" "):
            if re.match("a|the|an|the|to|in|for|of|or|by|with|is|on|that|be|was", text):
                continue
            val = tmpDict.get(text, 0)
            tmpDict[text.lower()] = val + 1
        for key in tmpDict:
            fullTermsDict.add(key, tmpDict[key])
        return fullTermsDict

    def make_image(text):
        alice_mask = np.array(Image.open("word_cloud_rename/alice_mask.png"))

        wc = WordCloud(background_color="white", max_words=1000, mask=alice_mask)
        # generate word cloud
        wc.generate_from_frequencies(text)

        # show
        plt.imshow(wc, interpolation="bilinear")
        plt.axis("off")
        plt.show()

    # get data directory (using getcwd() is needed to support running example in generated IPython notebook)
    d = path.dirname(__file__) if "__file__" in locals() else os.getcwd()

    text = open(path.join(d, 'word_cloud_rename/flavortown.txt'), encoding='utf-8')
    text = text.read()
    make_image(get_frequency_dict_for_text(text))

    # # get data directory (using getcwd() is needed to support running example in generated IPython notebook)
    # d = path.dirname(__file__) if "__file__" in locals() else os.getcwd()
    #
    # # Read the whole text.
    # text = open(path.join(d, 'word_cloud_rename/flavortown.txt'), encoding="utf-8").read()
    #
    # # read the mask image
    # # taken from
    # # http://www.stencilry.org/stencils/movies/alice%20in%20wonderland/255fk.jpg
    # alice_mask = np.array(Image.open(path.join(d, "word_cloud_rename/alice_mask.png")))
    #
    # stopwords = set(STOPWORDS)
    # stopwords.add("justin")
    # stopwords.add("travis")
    # stopwords.add("griffin")
    # stopwords.add("re")
    # stopwords.add("uh")
    # stopwords.add("um")
    #
    # wc = WordCloud(background_color="white", max_words=2000, mask=alice_mask,
    #                stopwords=stopwords, contour_width=0)
    #
    # # generate word cloud
    # wc.generate(text)
    #
    # # store to file
    # # wc.to_file(path.join(d, "alice.png"))
    #
    # # show
    # plt.imshow(wc, interpolation='bilinear')
    # plt.axis("off")
    # plt.figure()
    # plt.imshow(alice_mask, cmap=plt.cm.gray, interpolation='bilinear')
    # plt.axis("off")
    # plt.show()
    # #
    # # mpld3.show()