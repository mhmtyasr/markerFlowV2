using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MarkerFlow.Topics.Dto
{
    public class PostTopicDto
    {
            public string Title { get; set; }
            public string PageUrl { get; set; }
            public string PageIconUrl { get; set; }
            public string Comment { get; set; }
            public string? Element { get; set; }
            public List<int>? MentionUserIds { get; set; }
    }
}
