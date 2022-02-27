﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using System.Text;
using DotVVM.Framework.Controls.DynamicData.Metadata;
using DotVVM.Framework.Utils;

namespace DotVVM.Framework.Controls.DynamicData.PropertyHandlers.FormEditors
{
    public class SelectorComboBoxFormEditorProvider : FormEditorProviderBase
    {
        public override bool CanHandleProperty(PropertyInfo propertyInfo, DynamicDataContext context)
        {
            return context.PropertyDisplayMetadataProvider.GetPropertyMetadata(propertyInfo).SelectorConfiguration != null
                && ReflectionUtils.IsPrimitiveType(propertyInfo.PropertyType);
        }

        public override DotvvmControl CreateControl(PropertyDisplayMetadata property, DynamicEditor.Props props, DynamicDataContext context)
        {
            var selectorConfiguration = property.SelectorConfiguration!;
            var selectorDataSourceBinding = SelectorHelper.DiscoverSelectorDataSourceBinding(context, selectorConfiguration.PropertyType);

            return new ComboBox()
                .SetCapability(props.Html)
                .SetProperty(c => c.DataSource, selectorDataSourceBinding)
                .SetProperty(c => c.ItemTextBinding, context.CreateValueBinding("DisplayName", selectorConfiguration.PropertyType))
                .SetProperty(c => c.ItemValueBinding, context.CreateValueBinding("Value", selectorConfiguration.PropertyType))
                .SetProperty(c => c.SelectedValue, props.Property)
                .SetProperty(c => c.Enabled, props.Enabled)
                .SetProperty(c => c.SelectionChanged, props.Changed);
        }

    }
}
