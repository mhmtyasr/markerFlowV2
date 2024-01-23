using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MarkerFlow.Comments.Dto
{
    public class PostCommentDto
    {
        public string Comment { get; set; }
        public string Element { get; set; }
        public List<int>? MentionUserIds { get; set; }
        public int TopicId { get; set; }
    }
}
