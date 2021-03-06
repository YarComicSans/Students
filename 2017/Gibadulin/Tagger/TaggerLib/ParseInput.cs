﻿using System;

namespace TaggerLib
{
    public class ParseInput
    {
        public static InputData Parse(string[] args)
        {
            if (args.Length > 4 || args.Length < 3)
            {
                throw new ArgumentException("Wrong count of argument");
            }
            if (args.Length == 4 && args[3] != Consts.Subfolder)
            {
                throw new ArgumentException("Wrong Subfolders string");
            }

            var inputData = new InputData();
            inputData.Path = args[0];
            inputData.Mask = args[1];
            inputData.Modifier = args[2];
            if (args.Length == 4)
                inputData.Subfolders = true;
            else
                inputData.Subfolders = false;

            return inputData;
        }
    }
}
