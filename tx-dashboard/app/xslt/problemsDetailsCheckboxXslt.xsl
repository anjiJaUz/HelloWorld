<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet
xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
version="1.0"
>

<xsl:output method="xml" encoding="utf-8"/>

<xsl:key name="header1" match="record" use="ErrorGroupType"/>
<xsl:key name="header2" match="record" use="concat(ErrorGroupType, '|', ErrorGroup)"/>

<xsl:template match="/root">
  <xsl:apply-templates select="record[generate-id() =  generate-id(key('header1', ErrorGroupType)[1])]" mode="header1" />
</xsl:template>

<xsl:template match="record" mode="header1">
  <div class="form-group">
    <div class="checkbox">
      <label>
        <input type="checkbox"
               ng-checked="isGroupChecked('{ErrorGroupType}')"
               ng-click="toggleGroup('{ErrorGroupType}')"/>
        <xsl:value-of select="ErrorGroupType"/>
      </label>
      <xsl:apply-templates select="key('header1', ErrorGroupType) [generate-id() = generate-id(key('header2', concat(ErrorGroupType, '|', ErrorGroup))[1])]" mode="header2"> 
        <xsl:with-param name="header2" select="ErrorGroupType"/>
      </xsl:apply-templates>
    </div>
  </div>
</xsl:template>

<xsl:template match="record" mode="header2">
  <xsl:param name="header2"/>
  <div class="checkbox">
    <label>
      <input type="checkbox"
             ng-checked="isGroupChecked('{ErrorGroup}')"
             ng-click="toggleGroup('{ErrorGroup}')"/>
      <xsl:value-of select="ErrorGroup"/>
    </label>
    <xsl:apply-templates select="key('header2', concat(ErrorGroupType, '|', ErrorGroup))" mode="header3"> 
      <xsl:with-param name="header2" select="$header2"/>
      <xsl:with-param name="header3" select="ErrorGroup"/>
    </xsl:apply-templates>
  </div>
</xsl:template>

<xsl:template match="record" mode="header3">
  <xsl:param name="header2"/>
  <xsl:param name="header3"/>

  <div class="checkbox">
    <label><input type="checkbox"
             ng-checked="isChecked('{$header2} {$header3} {ErrorType}')"
             ng-click="toggle('{$header2} {$header3} {ErrorType}')"/>
      <xsl:value-of select="ErrorType"/>
    </label>
  </div>

</xsl:template>


</xsl:stylesheet>

<!--
the result is the input boxes on the details tab.

-->