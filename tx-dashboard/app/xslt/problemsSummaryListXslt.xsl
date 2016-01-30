<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet
xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
version="1.0"
>

<xsl:output method="text" encoding="utf-8"/>

<xsl:key name="header1" match="record" use="ErrorGroupType"/>
<xsl:key name="header2" match="record" use="concat(ErrorGroupType, '|', ErrorGroup)"/>

<xsl:template match="/root">
  <xsl:text>[</xsl:text>
    <xsl:apply-templates select="record[generate-id() =  generate-id(key('header1', ErrorGroupType)[1])]" mode="header1" />
  <xsl:text>]</xsl:text>
</xsl:template>

<xsl:template match="record" mode="header1">
  <xsl:apply-templates select="key('header1', ErrorGroupType) [generate-id() = generate-id(key('header2', concat(ErrorGroupType, '|', ErrorGroup))[1])]" mode="header2"> 
    <xsl:with-param name="header2" select="ErrorGroupType"/>
  </xsl:apply-templates>
</xsl:template>

<xsl:template match="record" mode="header2">
  <xsl:param name="header2"/>
  <xsl:apply-templates select="key('header2', concat(ErrorGroupType, '|', ErrorGroup))" mode="header3"> 
    <xsl:with-param name="header2" select="$header2"/>
    <xsl:with-param name="header3" select="ErrorGroup"/>
    <xsl:with-param name="firstPosition" select="position()"/>
  </xsl:apply-templates>
</xsl:template>

<xsl:template match="record" mode="header3">
  <xsl:param name="header2"/>
  <xsl:param name="header3"/>
  <xsl:param name="firstPosition"/>

  <xsl:text>[</xsl:text>
  <xsl:choose>
    <xsl:when test="position() = 1">
      <xsl:choose>
        <xsl:when test="$firstPosition = 1">
          <xsl:text/>'<xsl:value-of select="$header2"/>',<xsl:text/>
        </xsl:when>
      <xsl:otherwise>
          <xsl:text>'',</xsl:text>
      </xsl:otherwise>
      </xsl:choose>
      <xsl:text/>'<xsl:value-of select="$header3"/>',<xsl:text/>
    </xsl:when>
  <xsl:otherwise>
      <xsl:text>'','',</xsl:text>
  </xsl:otherwise>
  </xsl:choose>
<xsl:text/>'<xsl:value-of select="ErrorType"/>',<xsl:text/>
<xsl:value-of select="SeverityClass"/>,<xsl:text/>
<xsl:value-of select="TotalCount"/>,<xsl:text/>
<xsl:value-of select="ErrorCount"/>],
</xsl:template>


</xsl:stylesheet>

<!--
the result of this transformation is:

[['Resources','DataBaseSize','CCR',3,281,0],
['','','namechecking',3,281,0],
['','','PLIB',3,281,0],
['','DiskSpace','diskC',3,24,0],
['','','diskD',3,24,11],
['Services','MongoDb','processing missing',3,1,0],
['','','failed',3,281,0],
['','Namechecking','timeout',3,48,0],
['','','failed',3,1,0],
['','online__OPE_CREDIT','processing_failed',3,3,0],
['','','processing_failed_soap  ',3,3,0],
['','TXM','test_faield',3,281,0],
]
-->
