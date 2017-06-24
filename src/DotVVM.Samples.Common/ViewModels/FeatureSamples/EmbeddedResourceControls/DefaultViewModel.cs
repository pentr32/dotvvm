﻿using DotVVM.Framework.ViewModel;


namespace DotVVM.Samples.Common.ViewModels.FeatureSamples.EmbeddedResourceControls
{
    public class DefaultViewModel : DotvvmViewModelBase
    {
        public string Text { get; set; } = "Nothing";

        public void ChangeText()
        {
            Text = "This is text";
        }
    }
}

