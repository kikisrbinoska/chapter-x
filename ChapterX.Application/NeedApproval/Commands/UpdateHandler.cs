using ChapterX.Domain.Repositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace ChapterX.Application.NeedApproval.Commands
{
    public class UpdateHandler : IRequestHandler<UpdateRequest, UpdateResponse>
    {
        private readonly INeedApprovalRepository _needApprovalRepository;
        private readonly ILogger<UpdateHandler> _logger;

        public UpdateHandler(INeedApprovalRepository needApprovalRepository, ILogger<UpdateHandler> logger)
        {
            _needApprovalRepository = needApprovalRepository;
            _logger = logger;
        }

        public async Task<UpdateResponse> Handle(UpdateRequest request, CancellationToken cancellationToken)
        {
            var needApproval = await _needApprovalRepository.GetByIdAsync(request.Id, cancellationToken);
            if (needApproval is null)
                return new UpdateResponse(false);

            // No updatable fields on NeedApproval entity

            await _needApprovalRepository.UpdateAsync(needApproval, cancellationToken);

            return new UpdateResponse(true);
        }
    }
}
