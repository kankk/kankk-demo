function createDocument() {
  if (typeof arguments.callee.activeXString != "string") {
    var versions = ["MSXML2.DOMDocument.6.0", "MSXML2.DOMDocument.3.0", "MSXML2.DOMDocument"],
      i, len;

    for (i = 0, len = versions.length; i < len; i++) {
      try {
        new ActiveXObject(versions[i]);
        arguments.callee.activeXString = versions[i];
        break;
      } catch (ex) {
        // 跳过
      }
    }
  }
}

function parseXml(xml) {
  var xmldom = null;

  if (typeof DOMParser != "undefined") {
    xmldom = (new DOMParser()).parseFromString(xml, "text/xml");

    var errors = xmldom.getElementsByTagName("parsererror");
    if (errors.length) {
      throw new Error("XML parsing error: " + errors[0].textContent);
    }
  } else if (typeof ActiveXObject != "undefined") {
    xmldom = createDocument();
    xmldom.loadXML(xml);
    if (xmldom.parseError != 0) {
      throw new Error("XML parsing error: " + xmldom.parseError.reason);
    }
  } else {
    throw new Error("No XML parser available.");
  }

  return xmldom;
}

function serializeXml(xmldom) {
  if (typeof XMLSerializer != "undefined") {
    return (new XMLSerializer()).serializeToString(xmldom);
  } else if (typeof xmldom.xml != "undefined") {
    return xmldom.xml;
  } else {
    throw new Error("Could not serialize XML DOM.");
  }
}

// XPath
function selectSingleNode(context, expression, namespaces) {
  var doc = (context.nodeType != 9 ? context.ownerDocument : context);

  if (typeof doc.evaluate != "undefined") {
    var nsresolver = null;
    if (namespaces instanceof Object) {
      nsresolver = function (prefix) {
        return namespaces[prefix];
      }
    }

    var result = doc.evaluate(expression, context, nsresolver, XPathResult.FIRST_ORDERED_NODE_TYPE, null);

    return (result !== null ? result.singleNodeValue : null);
  } else if (typeof context.selectSingleNode != "undefined") {

    // 创建命名空间字符串
    if (namespaces instanceof Object) {
      var ns = "";
      for (var prefix in namespaces) {
        if (namespaces.hasOwnProperty(prefix)) {
          ns += "xmlns:" + prefix + "=" + namespaces[prefix] + "' ";
        }
      }
      doc.setProperty("SelectionNamespaces", ns);
    }
    return context.selectSingleNode(expression);
  } else {
    throw new Error("No XPath engine found.");
  }
}

function selectNodes(context, expression, namespaces) {
  var doc = (context.nodeType != 9 ? context.ownerDocument : context);

  if (typeof doc.evaluate != "undefined") {
    var nsresolver = null;
    if (namespaces instanceof Object) {
      nsresolver = function (prefix) {
        return namespaces[prefix];
      }
    }

    var result = doc.evaluate(expression, context, nsresolver, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

    var nodes = new Array();

    if (result !== null) {
      for (var i = 0, len = result.snapshotLength; i < len; i++) {
        nodes.push(result.snapshotLength(i));
      }
    }
    return nodes;
  } else if (typeof context.selectSingleNode != "undefined") {

    // 创建命名空间字符串
    if (namespaces instanceof Object) {
      var ns = "";
      for (var prefix in namespaces) {
        if (namespaces.hasOwnProperty(prefix)) {
          ns += "xmlns:" + prefix + "=" + namespaces[prefix] + "' ";
        }
      }
      doc.setProperty("SelectionNamespaces", ns);
    }
    var result = context.selectNodes(expression);
    var nodes = new Array();

    for (var i = 0, len = result.length; i < len; i++) {
      nodes.push(result[i]);
    }
    return nodes;
  } else {
    throw new Error("No XPath engine found.");
  }
}