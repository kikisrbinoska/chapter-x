using ChapterX.Domain.Repositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace ChapterX.Application.NeedApproval.Queries
{
    public class GetAllHandler : IRequestHandler<GetAllRequest, GetAllResponse>
    {
        private readonly INeedApprovalRepository _needApprovalRepository;
        private readonly ILogger<GetAllHandler> _logger;

        public GetAllHandler(INeedApprovalRepository needApprovalRepository, ILogger<GetAllHandler> logger)
        {
            _needApprovalRepository = needApprovalRepository;
            _logger = logger;
        }

        public async Task<GetAllResponse> Handle(GetAllRequest request, CancellationToken cancellationToken)
        {
            var needApprovals = await _needApprovalRepository.GetAllAsync(cancellationToken);
            return new GetAllResponse(needApprovals);
        }
    }
}
