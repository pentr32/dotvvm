﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//     Runtime Version:4.0.30319.42000
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace DotVVM.Tracing.ApplicationInsights.Owin {
    using System;
    
    
    /// <summary>
    ///   A strongly-typed resource class, for looking up localized strings, etc.
    /// </summary>
    // This class was auto-generated by the StronglyTypedResourceBuilder
    // class via a tool like ResGen or Visual Studio.
    // To add or remove a member, edit your .ResX file then rerun ResGen
    // with the /str option, or rebuild your VS project.
    [global::System.CodeDom.Compiler.GeneratedCodeAttribute("System.Resources.Tools.StronglyTypedResourceBuilder", "15.0.0.0")]
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute()]
    [global::System.Runtime.CompilerServices.CompilerGeneratedAttribute()]
    internal class Resources {
        
        private static global::System.Resources.ResourceManager resourceMan;
        
        private static global::System.Globalization.CultureInfo resourceCulture;
        
        [global::System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1811:AvoidUncalledPrivateCode")]
        internal Resources() {
        }
        
        /// <summary>
        ///   Returns the cached ResourceManager instance used by this class.
        /// </summary>
        [global::System.ComponentModel.EditorBrowsableAttribute(global::System.ComponentModel.EditorBrowsableState.Advanced)]
        internal static global::System.Resources.ResourceManager ResourceManager {
            get {
                if (object.ReferenceEquals(resourceMan, null)) {
                    global::System.Resources.ResourceManager temp = new global::System.Resources.ResourceManager("DotVVM.Tracing.ApplicationInsights.Owin.Resources", typeof(Resources).Assembly);
                    resourceMan = temp;
                }
                return resourceMan;
            }
        }
        
        /// <summary>
        ///   Overrides the current thread's CurrentUICulture property for all
        ///   resource lookups using this strongly typed resource class.
        /// </summary>
        [global::System.ComponentModel.EditorBrowsableAttribute(global::System.ComponentModel.EditorBrowsableState.Advanced)]
        internal static global::System.Globalization.CultureInfo Culture {
            get {
                return resourceCulture;
            }
            set {
                resourceCulture = value;
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to appInsights.setAuthenticatedUserContext(&quot;{0}&quot;);.
        /// </summary>
        internal static string JavaScriptAuthSnippet {
            get {
                return ResourceManager.GetString("JavaScriptAuthSnippet", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to     &lt;script type=&quot;text/javascript&quot;&gt;
        ///        var appInsights=window.appInsights||function(config){{
        ///            function i(config){{t[config]=function(){{var i=arguments;t.queue.push(function(){{t[config].apply(t,i)}})}}}}var t={{config:config}},u=document,e=window,o=&quot;script&quot;,s=&quot;AuthenticatedUserContext&quot;,h=&quot;start&quot;,c=&quot;stop&quot;,l=&quot;Track&quot;,a=l+&quot;Event&quot;,v=l+&quot;Page&quot;,y=u.createElement(o),r,f;y.src=config.url||&quot;https://az416426.vo.msecnd.net/scripts/a/ai.0.js&quot;;u.getElementsByTagName(o)[0].parentNode.appendChild(y);try{ [rest of string was truncated]&quot;;.
        /// </summary>
        internal static string JavaScriptSnippet {
            get {
                return ResourceManager.GetString("JavaScriptSnippet", resourceCulture);
            }
        }
    }
}
