using Abp.Domain.Entities.Auditing;
using Abp.Domain.Entities;
using MarkerFlow.MultiTenancy;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MarkerFlow.Topics
{
    [Table("Topics")]
    public class Topics : FullAuditedEntity<int>, IMustHaveTenant
    {
        public string Title { get; set; }
        public string PageUrl { get; set; }
        public string PageIconUrl { get; set; }
        public int TenantId { get  ; set ; }

        public ICollection<Comments.Comments> Comments { get; set; }
    }
}


