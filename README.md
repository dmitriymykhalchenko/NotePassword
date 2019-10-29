# NotePassword
&nbsp;
[Start](https://github.com/dmitriymykhalchenko/NotePassword/blob/master/img/1.png)
&nbsp;
[Plus text](https://github.com/dmitriymykhalchenko/NotePassword/blob/master/img/2.png)
&nbsp;
[NotePassword](https://github.com/dmitriymykhalchenko/NotePassword/blob/master/img/3.png)
&nbsp;
[Setting](https://github.com/dmitriymykhalchenko/NotePassword/blob/master/img/4.png)
&nbsp;
<h4 style="font-size:50px;color:red;">If you have such a <b>"requireNativeComponent: "InteractableView" was not found in the UIManager"</b> error, follow the instructions below</h4>


<h2>Installation </h2>

<b>Manually link via Cocoa Pods (iOS)</b>
<ul>
<li>Add the following to your «Podfile» </li>
	</ul>

<strong>pod 'Interactable', :path => '../node_modules/react-native-interactable/lib/ios'</strong>
<p>and then save it</p>

<ol start="1">
<li>go to "node_modules/react-native-interactable/lib/ios" folder</li>
<li>add new blank file rename it "Interactable.podspec"</li>
<li>add this code in the file</li>
</ol>
<blockquote>
<p>Pod::Spec.new do |s|<br>
s.name         = "Interactable"<br>
s.version      = "1.0.0"<br>
s.summary      = "Interactable"<br>
s.description  = "Interactable"<br>
s.homepage     = "<a href="https://github.com/wix/react-native-interactable">https://github.com/wix/react-native-interactable</a>"<br>
s.license      = "MIT"<br>
s.author             = { "author" =&gt; "<a href="mailto:author@domain.com">author@domain.com</a>" }<br>
s.platform     = :ios, "7.0"<br>
s.source       = { :git =&gt; "<a href="https://github.com/wix/react-native-interactable.git">https://github.com/wix/react-native-interactable.git</a>", :tag =&gt; "master" }<br>
s.source_files  = "Interactable/**/*.{h,m}"<br>
s.requires_arc = true<br>
s.dependency "React"<br>
end</p>
</blockquote>

<ol start="4">
<li>save it.</li>
<li>open your terminal now and from your project main root <code>cd ios</code> press enter and <code>pod install</code><br>
Should work fine. cheers...</li>
</ol>
