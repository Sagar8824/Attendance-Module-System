$ErrorActionPreference = "Stop"

$Path = "c:\Users\sjat8\OneDrive\Desktop\Attendance_Module_system\Project_Report\Final_Project_Report_v2.docx"
$Word = New-Object -ComObject Word.Application
$Word.Visible = $False
$Doc = $Word.Documents.Open($Path)

Write-Output "Shapes:"
foreach ($shape in $Doc.Shapes) {
    try {
        $page = $shape.Anchor.Information(3) # wdActiveEndPageNumber = 3
        Write-Output "Shape ID: $($shape.ID), Type: $($shape.Type), Name: $($shape.Name), Page: $page"
    } catch {
        Write-Output "Shape without anchor page"
    }
}

Write-Output "Page Borders:"
foreach ($section in $Doc.Sections) {
    Write-Output "Section Border Right Line Style: $($section.Borders.Item(-3).LineStyle)" # wdBorderRight = -3
}

$Doc.Close($false)
$Word.Quit()
[System.Runtime.Interopservices.Marshal]::ReleaseComObject($Word) | Out-Null
