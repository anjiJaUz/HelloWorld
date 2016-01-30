<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet
xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
version="1.0"
>

<xsl:output method="text" encoding="utf-8"/>

<xsl:key name="header1" match="record" use="ErrorGroupType"/>
<xsl:key name="header2" match="record" use="concat(ErrorGroupType, '|', ErrorGroup)"/>

<xsl:template match="/root">
  <xsl:text>{ name: 'root', </xsl:text>
  <xsl:text>children : [</xsl:text>
    <xsl:apply-templates select="record[generate-id() =  generate-id(key('header1', ErrorGroupType)[1])]" mode="header1" />
  <xsl:text>]</xsl:text>}
<!--
-->
</xsl:template>

<xsl:template match="record" mode="header1">
  <xsl:apply-templates select="key('header1', ErrorGroupType) [generate-id() = generate-id(key('header2', concat(ErrorGroupType, '|', ErrorGroup))[1])]" mode="header2"> 
    <xsl:with-param name="header2" select="ErrorGroupType"/>
  </xsl:apply-templates>
</xsl:template>

<xsl:template match="record" mode="header2">
  <xsl:param name="header2"/>

{<xsl:text>name: </xsl:text>'<xsl:value-of select="ErrorGroup"/>', <xsl:text/>
  <xsl:text>color: </xsl:text>color('<xsl:value-of select="ErrorGroup"/>'), <xsl:text/>
children : [<xsl:text/>
  <xsl:apply-templates select="key('header2', concat(ErrorGroupType, '|', ErrorGroup))" mode="header3"> 
    <xsl:with-param name="header2" select="$header2"/>
    <xsl:with-param name="header3" select="ErrorGroup"/>
    <xsl:with-param name="firstPosition" select="position()"/>
  </xsl:apply-templates>
  <xsl:text>]</xsl:text>},
</xsl:template>

<xsl:template match="record" mode="header3">
  <xsl:param name="header2"/>
  <xsl:param name="header3"/>
  <xsl:param name="firstPosition"/>

<xsl:text>{</xsl:text>
<xsl:text/>name: '<xsl:value-of select="ErrorType"/>', <xsl:text/>
<xsl:text/>color: color('<xsl:value-of select="ErrorType"/>'), <xsl:text/>
<xsl:text/>size: <xsl:value-of select="ErrorCount"/>,<xsl:text/>},
</xsl:template>


</xsl:stylesheet>
