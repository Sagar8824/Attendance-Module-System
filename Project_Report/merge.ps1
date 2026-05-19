$templatePath = "C:\Users\sjat8\OneDrive\Desktop\Attendance_Module_system\Project_Report\template.doc"
$chaptersPath = "C:\Users\sjat8\OneDrive\Desktop\Attendance_Module_system\Project_Report\Chapters_Only.docx"
$outputPath = "C:\Users\sjat8\OneDrive\Desktop\Attendance_Module_system\Project_Report\Final_Project_Report.docx"

$word = New-Object -ComObject Word.Application
$word.Visible = $false

try {
    $doc = $word.Documents.Open($templatePath)
    $selection = $word.Selection
    
    # Find "Chapter 1"
    $selection.HomeKey(6) # wdStory = 6
    $find = $selection.Find
    $find.Text = "Chapter 1"
    $find.MatchWholeWord = $true
    
    if ($find.Execute()) {
        # Select from here to end of document
        $selection.EndKey(6, 1) # wdStory = 6, wdExtend = 1
        $selection.Delete()
        
        # Insert the chapters document
        $selection.InsertFile($chaptersPath)
        
        # Save as docx
        $doc.SaveAs([ref]$outputPath, [ref]16) # wdFormatDocumentDefault = 16
        Write-Output "Successfully created Final_Project_Report.docx"
    } else {
        Write-Output "Could not find 'Chapter 1' in the template."
    }
} catch {
    Write-Output "Error: $_"
} finally {
    if ($doc) { $doc.Close([ref]0) } # wdDoNotSaveChanges = 0
    $word.Quit()
    [System.Runtime.Interopservices.Marshal]::ReleaseComObject($word) | Out-Null
}
