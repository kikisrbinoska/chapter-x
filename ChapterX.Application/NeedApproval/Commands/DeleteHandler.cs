using ChapterX.Domain.Repositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace ChapterX.Application.NeedApproval.Commands
{
    public class DeleteHandler : IRequestHandler<DeleteRequest, DeleteResponse>
    {
        private readonly INeedApprovalRepository _needApprovalRepository;
        private readonly ILogger<DeleteHandler> _logger;

        public DeleteHandler(INeedApprovalRepository needApprovalRepository, ILogger<DeleteHandler> logger)
        {
            _needApprovalRepository = needApprovalRepository;
            _logger = logger;
        }

        public async Task<DeleteResponse> Handle(DeleteRequest request, CancellationToken cancellationToken)
        {
            var needApproval = await _needApprovalRepository.GetByIdAsync(request.Id, cancellationToken);
            if (needApproval is null)
                return new DeleteResponse(false);

            await _needApprovalRepository.DeleteAsync(needApproval, cancellationToken);

            return new DeleteResponse(true);
        }
    }
}
