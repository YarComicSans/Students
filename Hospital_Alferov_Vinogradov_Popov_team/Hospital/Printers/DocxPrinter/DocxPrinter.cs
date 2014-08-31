﻿using System.IO;
using System.Text;
using GemBox.Document;
using Shared.Interfaces;

namespace DocxPrinter
{
    public class DocxPrinter : IPrinter
    {
        public string PathToFile { get; set; }

        public void Print(string filledHtmlTemplate)
        {
            var ms = new MemoryStream(Encoding.UTF8.GetBytes(filledHtmlTemplate));
            DocumentModel.Load(ms, LoadOptions.HtmlDefault).Save(PathToFile + ".docx");
        }
    }
}